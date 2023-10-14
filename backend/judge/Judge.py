import requests
from judge.hashed import HashToken
import json

#Token 불러오기
hash_token = HashToken()

#judge server URL
url = "https://js.codingschool.co.kr/judge"

#언어 config설정
#칭따오 서버의 python버전이 3.6으로 바뀌었음
# --> 따라서 exe_name의 이름을 36으로 설정함.
py3_lang_config = { 
    'compile' : {
        'src_name' : "solution.py",
        'exe_name' : "__pycache__/solution.cpython-36.pyc",
        'max_cpu_time' : 3000,
        'max_real_time' : 5000,
        'max_memory' : 128 * 1024 * 1024,
        'compile_command' : "/usr/bin/python3 -m py_compile {src_path}",
    },
    'run' : {
        'command' : "/usr/bin/python3 {exe_path}",
        'seccomp_rule' : "general",
        'env' : [ "PYTHONIOENCODING=UTF-8", "LANG=en_US.UTF-8", "LANGUAGE=en_US:en", "LC_ALL=en_US.UTF-8"],
    }
}
def judge_result(response):
    # code0 : success
    # code1 : testcaseError
    # code2 : compile Error

    # Compilation failure
    if 'err' in response and response['err'] == "CompileError":
        return {'code':2,'message':"Compilation Failed: " + response['data']}

    if 'err' in response and response['err'] == "JudgeClientError":
        return {'code':3,'message':"Compilation Failed: " + response['data']}
    # Test cases results
    for test_case_result in response['data']:
        if test_case_result['result'] != 0:
            return {'code':1,'message':"Test case Failed: ID - " + str(test_case_result['test_case']),'output':test_case_result['output']}
    
    return {'code':0,'message':"All test cases passed successfully."}


def JudgeReq(source,test_case_list) :

	#max_cpu_time 단위 Ms
	#max-memory 단위 바이트

	data = { 'language_config' : py3_lang_config,
		'src':source, 
		'max_cpu_time':1000, 
		'max_memory':1024 * 1024 * 128,
		'test_case_id':"", 
		'test_case':test_case_list,
	    'output':True }


	headers = { "Content-Type": 'application/json', "X-Judge-Server-Token" : hash_token}

	
	r = requests.post(url, data=json.dumps(data), headers=headers)
	data = json.loads(r.text)

	return judge_result(data)