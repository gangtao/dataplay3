import json

user_config = '''{
    "name": "Gang Tao",
    "avatar": "https://media.licdn.com/dms/image/C5603AQFMy-KsDSViMA/profile-displayphoto-shrink_100_100/0?e=1558569600&v=beta&t=Fy309Fn-5saRMdWuy4qAjnQS9vplgtkazglS4kusRnk",
    "userid": "00000001",
    "email": "gang.tao@outlook.com",
    "signature": "hahaha",
    "title": "engineer",
    "group": "engineer",
    "tags": [{
        "key": "0",
        "label": "很有想法的"
    }, {
        "key": "1",
        "label": "专注设计"
    }],
    "notifyCount": 12,
    "unreadCount": 11,
    "country": "China",
    "geographic": {
        "province": {
            "label": "浙江省",
            "key": "330000"
        },
        "city": {
            "label": "杭州市",
            "key": "330100"
        }
    },
    "address": "xxx-xxx",
    "phone": "123-456-7890"
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
