import json

user_config = '''{
    "name": "Gang Tao",
    "avatar": "https://media.licdn.com/dms/image/C5603AQFMy-KsDSViMA/profile-displayphoto-shrink_100_100/0?e=1558569600&v=beta&t=Fy309Fn-5saRMdWuy4qAjnQS9vplgtkazglS4kusRnk",
    "userid": "00000001",
    "email": "gang.tao@outlook.com",
    "signature": "",
    "title": "大数据架构师",
    "group": "",
    "tags": [{
        "key": "0",
        "label": "架构师"
    }, {
        "key": "1",
        "label": "数据科学爱好者"
    }],
    "notifyCount": 0,
    "unreadCount": 0,
    "country": "China",
    "geographic": {
        "province": {
            "label": "xxx",
            "key": "330000"
        },
        "city": {
            "label": "xxx",
            "key": "330100"
        }
    },
    "address": "xxx xxx xxx",
    "phone": "xxx-xxxxxx"
}'''

routes_config = '''{
    "/form/advanced-form": {
        "authority": ["admin", "user"]
    }
}'''


def get_user():
    return json.loads(user_config)


def get_routes():
    return json.loads(routes_config)
