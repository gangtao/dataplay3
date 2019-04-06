import json

notifications = '''
[
  {
    "id": "000000001",
    "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    "title": "Welcome to Dataplay3",
    "datetime": "2019-01-01",
    "type": "notification"
  }
]
'''


def get_notifications():
    return json.loads(notifications)
