from flask import Flask
from judge.Judge import JudgeReq
from flask_cors import CORS
from flask import request,jsonify
from flask_bcrypt import Bcrypt
from DB import *
from flask_jwt_extended import JWTManager, create_access_token, set_access_cookies
from flask_jwt_extended import jwt_required, get_jwt,unset_jwt_cookies,create_refresh_token,set_refresh_cookies
from google.auth.transport import requests
from google.oauth2 import id_token
from datetime import timedelta

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['JWT_SECRET_KEY'] = 'asdf1234'  # 실제 사용 시 보안을 위해 변경하십시오.
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False  # HTTPS를 사용할 경우 True로 설정하십시오.
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=3)
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Disable CSRF Protection
jwt = JWTManager(app)

bcrypt = Bcrypt(app)


CLIENT_ID = '963824164602-pgc8lggs3ac9cvea5lkahmfflifd3rru.apps.googleusercontent.com' #google

@app.route('/user/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@app.route('/user/status', methods=['GET'])
@jwt_required()
def user_status():
    current_user = get_jwt()
    useremail = current_user["sub"]  # The "sub" claim is usually the user identity
    if useremail == 'admin@oj.com':
        username = 'admin'
    else:
        user = Get_user_info(useremail)
        username = list(user.values())[0]['username']
    role = current_user["role"]

    return jsonify(logged_in_as=useremail,role=role,username=username), 200

@app.route('/user/info', methods=['GET'])
@jwt_required()
def user_info():
    try:
        current_user = get_jwt()
        useremail = current_user["sub"]  # The "sub" claim is usually the user identity
        user_info = ''
        if not useremail == 'admin@oj.com':
            user_data = Get_user_info(useremail)
            user_info = list(user_data.values())[0]

        return jsonify(user_info=user_info), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/user/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        useremail = data.get('useremail')
        password = data.get('password')

        if useremail == 'admin@oj.com' and password == 'adminjudge':
            additional_claims = {"role": "admin"}
            username = 'admin'
        
        else:
            snapshot = Get_user_info(useremail)
            if not snapshot:
                return jsonify({'message': 'Account doesnt exist'}), 400

            original_password = list(snapshot.values())[0]['password']
            check = bcrypt.check_password_hash(original_password, password)
            if not check:
                return jsonify({'message': 'Incorrect password'}), 400
            username = list(snapshot.values())[0]['username']
            additional_claims = {"role": "user"}

        access_token = create_access_token(identity=useremail, additional_claims=additional_claims)
        response = jsonify({'login': True, 'role': additional_claims['role'],'username':username})
        set_access_cookies(response, access_token)
        return response, 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/user/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'message': 'No input data provided'}), 400
        
        useremail = data.get('useremail')
        password = data.get('password')
        username = data.get('username')

        if not useremail or not password or not username:
            return jsonify({'message': 'Must provide useremail and password'}), 400

        snapshot = Get_user_info(useremail)

        if snapshot:
            return jsonify({'message': 'User already exists'}), 400
        
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        Create_user(useremail, hashed_password,username)

        return jsonify({'message': 'New user created!'}), 201

    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/user/show_problemlist',methods=['GET'])
def show_problemlist():
    result = DB_show_problemList()
    
    if result is not None:
        new_result = {k: {"title": v["title"], "description": v["description"], "id": v["id"], "order": v["order"]} for k, v in result.items()} 
        result_list = list(new_result.values())
        return jsonify(result_list)
    return jsonify({'message': 'no problems'}), 400




@app.route('/user/google_login',methods=['POST'])
def google_login():
    try:
        # ID 토큰 검증
        idinfo = id_token.verify_oauth2_token(
            request.json['credential'], requests.Request(), CLIENT_ID)
        
        # idinfo['iss']는 토큰 발행자가 되며, 이를 확인하여 토큰의 유효성을 검증합니다.
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        
        # idinfo는 사용자에 관한 정보를 포함하고 있습니다.
        # 이 정보를 이용하여 DB에 사용자를 저장하거나 업데이트할 수 있습니다.
        useremail = idinfo['email']
        username = idinfo['name']
        account = Get_user_info(useremail)
        if account: #기존 웹페이지에서 계정이 있는사람
            account_role = list(account.values())[0]['role']
            username = list(account.values())[0]['username']
            additional_claims = {"role": account_role}
        else: #계정이 없는사람
            additional_claims = {"role": "user"}
            Create_google_user(useremail,username)
        
        access_token = create_access_token(identity=useremail, additional_claims=additional_claims)
        response = jsonify({'login': True, 'role': additional_claims['role'],'username':username})
        set_access_cookies(response, access_token)
        return response, 200
        
        # 이제 사용자를 DB에 저장하고, JWT를 생성하여 반환하면 됩니다.

    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500


@app.route('/user/problem/<post_id>',methods=['GET'])
@jwt_required()
def show_problem(post_id):
    result = DB_problem(post_id)
    if result is not None:
        return jsonify(result)
    return jsonify({'message': 'Fail'}), 400
    
@app.route('/admin/upload_part', methods=['POST'])
@jwt_required()
def upload_part():
    current_user = get_jwt()
    if current_user['role'] == 'admin':
        data = request.get_json()
        result = DB_upload_part(data)  # This function should add the book to the database.
        if result == 'success':
            return jsonify({'message': 'Book uploaded successfully'}), 200
    return jsonify({'message': 'Failed to upload the book'}), 500

@app.route('/admin/show_problemlist',methods=['GET'])
@jwt_required()
def admin_show_problemlist():
    current_user = get_jwt()
    if current_user['role'] == 'admin':
        result = DB_show_problemList()
        if result is not None:
            result_list = list(result.values())
            return jsonify(result_list)
    return jsonify({'message': 'no problems'}), 400

@app.route('/admin/update_order', methods=['POST'])
@jwt_required()
def update_order():
    new_problem_order = request.get_json()
    
    # Iterate over the received list of dictionaries
    for problem in new_problem_order:
        problem_id = problem.get('id')
        problem_order = problem.get('order')
        
        # Update the order value for the problem in the database
        result = DB_update_problem_order(problem_id, problem_order)
        
        # Handle the result if needed
        if result == 'success':
            pass
            
    # Return a response indicating the update was successful
    return jsonify({'message': 'Problem order updated successfully'}), 200

@app.route('/parts', methods=['GET'])
@jwt_required()
def get_parts():
    try:
        parts = DB_get_all_parts()
        return jsonify({'parts': parts}), 200
    except Exception as e:
        return jsonify({'message': f"An error occurred: {e}"}), 500
    

@app.route('/parts/<part_id>', methods=['GET'])
@jwt_required()
def get_part(part_id):
    try:
        part = DB_get_part_by_id(part_id)
        if part:
            return jsonify({'part': part}), 200
        else:
            return jsonify({'message': 'Part not found'}), 404
    except Exception as e:
        return jsonify({'message': f"An error occurred: {e}"}), 500


@app.route('/admin/post_problem',methods=['POST'])
@jwt_required()
def post_problem():
    current_user = get_jwt()
    if current_user['role'] == 'admin':
        data = request.get_json()
        result = DB_post_problem(data)
        if result == 'success':
            return jsonify({'message': 'Success'}), 200
    return jsonify({'message': 'Fail'}), 500

@app.route('/admin/delete_problem', methods=['POST'])
@jwt_required()
def delete_problem():
    current_user = get_jwt()
    if current_user['role'] == 'admin':
        data = request.get_json()
        result = DB_delete_problem(data['id'])
        if result == 'success':
            return jsonify({'message': 'Success'}), 200
    return jsonify({'message': 'Fail'}), 500

@app.route('/admin/edit_problem', methods=['POST'])
@jwt_required()
def edit_problem():
    current_user = get_jwt()
    if current_user['role'] == 'admin':
        data = request.get_json()
        result = DB_edit_problem(data, data['id'])
        if result == 'success':
            return jsonify({'message':'수정을 완료했습니다'}), 200
    return jsonify({'message': '수정을 할 수 없습니다'}), 500

    
@app.route('/judge/scoring',methods=['POST'])
@jwt_required()
def judge_scoring():
    # code0 : success
    # code1 : testcaseError
    # code2 : compile Error
    
    data = request.get_json()
    post_id = data['post_id']
    code = data['code']
    testcases = DB_get_testcases(post_id)
    result = JudgeReq(code,testcases)
    if result['code'] == 0:
        user = get_jwt()
        if user['role'] == 'user': #어드민은 유저 정보를 업데이트 하지 않음
            DB_solve_problem(user['sub'],post_id) #문제 해결시 유저의 정보 업데이트
    return result

if __name__ == '__main__':
    app.run()