import firebase_admin
from firebase_admin import credentials, db
import uuid



def generate_unique_id():
    unique_id = uuid.uuid4().int
    return unique_id


cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(
    cred, {'databaseURL': 'https://learnsteamjudge-default-rtdb.firebaseio.com/'})


def Get_user_info(useremail):
    dir = db.reference('/users')
    if dir.get() == None:
        return None
    snapshot = dir.order_by_child('useremail').equal_to(useremail).get()
    return snapshot

def Create_user(useremail, hashed_password, username):
    dir = db.reference('/users')
    new_user_ref = dir.push()
    new_user_ref.set({
        'useremail': useremail,
        'username': username,
        'password': hashed_password,
        'type': 'normal',
        'role': 'user',
        'problem_count': 0,
        'solved_problem':[],
    })


def Create_google_user(useremail, username):
    dir = db.reference('/users')
    new_user_ref = dir.push()
    new_user_ref.set({
        'username': username,
        'useremail': useremail,
        'type': 'google',
        'role': 'user',
        'problem_count': 0
    })
def DB_upload_part(part_data):
    try:
        part_id = str(generate_unique_id())  # Generate a unique ID for the part.
        part_directory = db.reference('/part/')  # Reference to the 'part' node in Firebase.

        # Get the highest 'order' for the parts, if they have an order attribute.
        parts_data = part_directory.get()
        if parts_data is None:
            next_order = 1  # If there are no parts, the order will be 1.
        else:
            part_list = [v for k, v in parts_data.items()]
            max_order = max([part['order'] for part in part_list if 'order' in part])
            next_order = max_order + 1

        part_data['id'] = part_id
        part_data['order'] = next_order  # Assign the next 'order'
        part_directory.update({part_id: part_data})

        return 'success'
    except Exception as e:
        print(f"An error occurred: {e}")
        return 'error'
def DB_get_all_parts():
    try:
        # Reference to the 'part' node in Firebase.
        part_directory = db.reference('/part/')
        
        # Get all parts.
        parts_data = part_directory.get()

        # If there are no parts, return an empty list.
        if parts_data is None:
            return []

        # Convert the dictionary to a list of parts.
        parts_list = [v for k, v in parts_data.items()]

        return parts_list
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def DB_get_part_by_id(part_id):
    try:
        # Reference to the specific 'part' in Firebase using the provided ID.
        part_directory = db.reference(f'/part/{part_id}')
        
        # Get the data of the specific part.
        part_data = part_directory.get()

        if part_data:
            return part_data
        else:
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def DB_post_problem(problem_data):
    try:
        problem_id = str(generate_unique_id())
        problem_directory = db.reference('/problem/')

        # Get the highest 'order'
        problems_data = problem_directory.get()
        if problems_data is None:
            next_order = 1
        else:
            problem_list = [v for k, v in problems_data.items()]
            max_order = max([problem['order'] for problem in problem_list])
            next_order = max_order + 1

        problem_data['id'] = problem_id
        problem_data['order'] = next_order  # Assign the next 'order'
        problem_directory.update({problem_id: problem_data})

        return 'success'
    except Exception as e:
        print(f"An error occurred: {e}")
        return 'error'


def DB_delete_problem(id):
    try:
        problem_directory = db.reference(f'/problem/{id}')
        problem_directory.delete()

        return 'success'
    except Exception as e:
        print(f"An error occurred: {e}")
        return 'error'


def DB_edit_problem(problem_data, id):
    try:
        dir = db.reference(f'/problem/{id}')
        dir.update(problem_data)
        return 'success'
    except:
        return 'error'


def DB_problem(problemID):
    try:
        dir = db.reference('/problem')
        data = dir.get()
        data = data[problemID]
        # showcase만 보내주도록 분류 과정
        result = {'title': data['title'], 'id': data['id'],
                  'TestCases': data['visibleTestCases'], 'description': data['description'],'modelHint':data['modelHint']}
        return result
    except:
        return None



def DB_show_problemList():
    try:

        dir = db.reference(f'/problem/')
        data = dir.get()
        return data
    except:
        return 'error'


def DB_get_testcases(post_id):
    try:
        dir = db.reference(f'/problem')
        data = dir.get()
        data = data[post_id]
        # 모여지는 testcase와 안보여지는 testcase를 합침
        result = data['visibleTestCases'] + data['hiddenTestCases']
        return result
    except:
        return 'error'

def DB_solve_problem(useremail, problemID):
    dir = db.reference('/users')
    users = dir.order_by_child('useremail').equal_to(useremail).get()
    user_data = list(users.values())[0]
    user_id = list(users.keys())[0]

    solved_problem_list = user_data.get('solved_problem', [])
    if problemID not in solved_problem_list:
        # If the problem is not solved, increment problem count
        problem_count = user_data.get('problem_count', 0)
        dir.child(user_id).update({'problem_count': problem_count + 1})

        # Add the problem to the solved problem list
        solved_problem_list.append(problemID)
        dir.child(user_id).update({'solved_problem': solved_problem_list})

    return

def DB_update_problem_order(problem_id, problem_order):
    try:
        dir = db.reference(f'/problem/{problem_id}')
        dir.update({'order': problem_order})
        return 'success'
    except Exception as e:
        print(f"An error occurred: {e}")
        return 'error'