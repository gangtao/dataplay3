import json

user_config = '''{
    "success": true,
    "user": {
        "id": 1,
        "username": "guest",
        "permissions": {
            "visit": ["1", "2", "21", "7", "5", "51", "52", "53"],
            "role": "guest"
        },
        "avatar": "https://randomuser.me/api/portraits/men/32.jpg"
    }
}'''

routes_config = '''[{
    "id": "1",
    "icon": "dashboard",
    "name": "Dashboard",
    "zhName": "仪表盘",
    "route": "/dashboard"
},{
    "id": "2",
    "icon": "database",
    "name": "Dataset",
    "zhName": "数据集",
    "route": "/dataset"
}]'''

dashboard_config = '''{
    "sales": [{
        "name": 2008,
        "Clothes": 344,
        "Food": 375,
        "Electronics": 325
    }, {
        "name": 2009,
        "Clothes": 498,
        "Food": 316,
        "Electronics": 469
    }, {
        "name": 2010,
        "Clothes": 438,
        "Food": 383,
        "Electronics": 505
    }, {
        "name": 2011,
        "Clothes": 422,
        "Food": 225,
        "Electronics": 353
    }, {
        "name": 2012,
        "Clothes": 365,
        "Food": 289,
        "Electronics": 397
    }, {
        "name": 2013,
        "Clothes": 246,
        "Food": 263,
        "Electronics": 524
    }, {
        "name": 2014,
        "Clothes": 358,
        "Food": 325,
        "Electronics": 447
    }, {
        "name": 2015,
        "Clothes": 487,
        "Food": 201,
        "Electronics": 336
    }],
    "cpu": {
        "usage": 456,
        "space": 825,
        "cpu": 55,
        "data": [{
            "cpu": 33
        }, {
            "cpu": 70
        }, {
            "cpu": 69
        }, {
            "cpu": 24
        }, {
            "cpu": 58
        }, {
            "cpu": 39
        }, {
            "cpu": 55
        }, {
            "cpu": 28
        }, {
            "cpu": 38
        }, {
            "cpu": 76
        }, {
            "cpu": 40
        }, {
            "cpu": 66
        }, {
            "cpu": 69
        }, {
            "cpu": 78
        }, {
            "cpu": 76
        }, {
            "cpu": 40
        }, {
            "cpu": 61
        }, {
            "cpu": 69
        }, {
            "cpu": 52
        }, {
            "cpu": 32
        }]
    },
    "browser": [{
        "name": "Google Chrome",
        "percent": 43.3,
        "status": 1
    }, {
        "name": "Mozilla Firefox",
        "percent": 33.4,
        "status": 2
    }, {
        "name": "Apple Safari",
        "percent": 34.6,
        "status": 3
    }, {
        "name": "Internet Explorer",
        "percent": 12.3,
        "status": 4
    }, {
        "name": "Opera Mini",
        "percent": 3.3,
        "status": 1
    }, {
        "name": "Chromium",
        "percent": 2.53,
        "status": 1
    }],
    "user": {
        "name": "github",
        "sales": 3241,
        "sold": 3556
    },
    "completed": [{
        "name": 2008,
        "Task complete": 750,
        "Cards Complete": 742
    }, {
        "name": 2009,
        "Task complete": 923,
        "Cards Complete": 526
    }, {
        "name": 2010,
        "Task complete": 252,
        "Cards Complete": 879
    }, {
        "name": 2011,
        "Task complete": 503,
        "Cards Complete": 399
    }, {
        "name": 2012,
        "Task complete": 468,
        "Cards Complete": 815
    }, {
        "name": 2013,
        "Task complete": 484,
        "Cards Complete": 433
    }, {
        "name": 2014,
        "Task complete": 695,
        "Cards Complete": 329
    }, {
        "name": 2015,
        "Task complete": 363,
        "Cards Complete": 462
    }, {
        "name": 2016,
        "Task complete": 337,
        "Cards Complete": 327
    }, {
        "name": 2017,
        "Task complete": 594,
        "Cards Complete": 556
    }, {
        "name": 2018,
        "Task complete": 727,
        "Cards Complete": 612
    }, {
        "name": 2019,
        "Task complete": 595,
        "Cards Complete": 550
    }],
    "comments": [{
        "name": "Thompson",
        "status": 2,
        "content": "Sdagbxrj psvfjholh uireedkg joyqanvzhe yvuozobe nrthnm jxlucxunp inijn nsuubnf oxgsm ychb qsjors smek.",
        "avatar": "http://dummyimage.com/48x48/79d3f2/757575.png&text=T",
        "date": "2016-08-14 00:45:04"
    }, {
        "name": "Lopez",
        "status": 2,
        "content": "Ivayijels dmwcvfqi helxkk ogmr jjxl kdxio upeq umivsvbs dqsmghjqnr ntcx pvocj grlug uwjvwedel hfuq cfjwknzjv.",
        "avatar": "http://dummyimage.com/48x48/f2ed79/757575.png&text=L",
        "date": "2016-04-30 18:36:27"
    }, {
        "name": "Rodriguez",
        "status": 3,
        "content": "Pqmulif ivfinlsm khqkqu dfwsyy naqgjf zcemylsqv gkvedivh flyjo vkdn tqwe curla dxussrkfn bwlucsqyx.",
        "avatar": "http://dummyimage.com/48x48/c979f2/757575.png&text=R",
        "date": "2016-01-03 18:39:47"
    }, {
        "name": "Taylor",
        "status": 2,
        "content": "Wmqbmmrrc bvct cjqdejkx ummndj iqto hnf ujkpj evi tseecpog izxpovuy mwfmqhzueb equx bjppkflv bukxr rhuo.",
        "avatar": "http://dummyimage.com/48x48/79f2a6/757575.png&text=T",
        "date": "2016-08-13 10:53:21"
    }, {
        "name": "Miller",
        "status": 2,
        "content": "Ogeta kfvw imxfpobx mpscpvwmfj tfdrn rocqa dhyfivr fvh lecxtwhw vfblu ccv bnvbgevpm xpnjtgs egnnyxoc tqpftv.",
        "avatar": "http://dummyimage.com/48x48/f28379/757575.png&text=M",
        "date": "2016-02-13 23:55:01"
    }],
    "recentSales": [{
        "id": 1,
        "name": "Robinson",
        "status": 2,
        "price": 158.31,
        "date": "2016-06-18 14:58:31"
    }, {
        "id": 2,
        "name": "Jones",
        "status": 1,
        "price": 11.24,
        "date": "2016-06-14 05:37:15"
    }, {
        "id": 3,
        "name": "Thomas",
        "status": 3,
        "price": 75.59,
        "date": "2016-06-13 15:20:28"
    }, {
        "id": 4,
        "name": "White",
        "status": 1,
        "price": 113.9,
        "date": "2015-11-01 08:31:13"
    }, {
        "id": 5,
        "name": "Wilson",
        "status": 3,
        "price": 180.48,
        "date": "2016-12-26 17:45:19"
    }, {
        "id": 6,
        "name": "Lewis",
        "status": 2,
        "price": 38.83,
        "date": "2016-12-28 21:34:11"
    }, {
        "id": 7,
        "name": "Lewis",
        "status": 4,
        "price": 199.17,
        "date": "2015-10-06 08:07:02"
    }, {
        "id": 8,
        "name": "Rodriguez",
        "status": 3,
        "price": 25.4,
        "date": "2016-05-30 17:10:01"
    }, {
        "id": 9,
        "name": "Allen",
        "status": 2,
        "price": 109.55,
        "date": "2016-05-05 19:39:22"
    }, {
        "id": 10,
        "name": "Thomas",
        "status": 1,
        "price": 26.3,
        "date": "2016-06-06 17:08:46"
    }, {
        "id": 11,
        "name": "Moore",
        "status": 2,
        "price": 121.2,
        "date": "2015-03-16 07:18:30"
    }, {
        "id": 12,
        "name": "Smith",
        "status": 3,
        "price": 104.2,
        "date": "2016-01-16 23:32:04"
    }, {
        "id": 13,
        "name": "Rodriguez",
        "status": 1,
        "price": 172.77,
        "date": "2016-02-12 01:01:06"
    }, {
        "id": 14,
        "name": "Taylor",
        "status": 4,
        "price": 128.71,
        "date": "2015-03-20 14:09:44"
    }, {
        "id": 15,
        "name": "Miller",
        "status": 2,
        "price": 62.8,
        "date": "2015-10-07 08:56:09"
    }, {
        "id": 16,
        "name": "Taylor",
        "status": 3,
        "price": 150.47,
        "date": "2016-10-31 21:49:37"
    }, {
        "id": 17,
        "name": "White",
        "status": 2,
        "price": 72.2,
        "date": "2015-03-01 06:24:16"
    }, {
        "id": 18,
        "name": "Jones",
        "status": 2,
        "price": 154.73,
        "date": "2015-09-05 10:29:40"
    }, {
        "id": 19,
        "name": "Hall",
        "status": 3,
        "price": 129.2,
        "date": "2016-04-20 06:17:37"
    }, {
        "id": 20,
        "name": "Hernandez",
        "status": 2,
        "price": 49.6,
        "date": "2015-04-07 21:38:55"
    }, {
        "id": 21,
        "name": "Thomas",
        "status": 1,
        "price": 26.7,
        "date": "2015-03-27 12:31:19"
    }, {
        "id": 22,
        "name": "White",
        "status": 3,
        "price": 10.1,
        "date": "2016-07-31 06:20:16"
    }, {
        "id": 23,
        "name": "Jackson",
        "status": 3,
        "price": 164.47,
        "date": "2015-07-02 09:10:48"
    }, {
        "id": 24,
        "name": "Young",
        "status": 2,
        "price": 103.77,
        "date": "2016-04-20 10:51:30"
    }, {
        "id": 25,
        "name": "Walker",
        "status": 2,
        "price": 114.4,
        "date": "2016-11-20 01:42:33"
    }, {
        "id": 26,
        "name": "Williams",
        "status": 3,
        "price": 48.6,
        "date": "2016-10-08 07:50:16"
    }, {
        "id": 27,
        "name": "Johnson",
        "status": 3,
        "price": 84.2,
        "date": "2016-02-17 03:08:44"
    }, {
        "id": 28,
        "name": "Jackson",
        "status": 3,
        "price": 76.5,
        "date": "2016-04-25 01:53:05"
    }, {
        "id": 29,
        "name": "Johnson",
        "status": 2,
        "price": 71.6,
        "date": "2015-05-28 18:22:54"
    }, {
        "id": 30,
        "name": "Rodriguez",
        "status": 1,
        "price": 179.48,
        "date": "2016-08-30 13:43:32"
    }, {
        "id": 31,
        "name": "Martinez",
        "status": 3,
        "price": 62.8,
        "date": "2016-06-25 01:09:26"
    }, {
        "id": 32,
        "name": "Miller",
        "status": 3,
        "price": 110.61,
        "date": "2016-08-19 09:27:33"
    }, {
        "id": 33,
        "name": "Martinez",
        "status": 2,
        "price": 172.45,
        "date": "2016-07-15 13:07:58"
    }, {
        "id": 34,
        "name": "Johnson",
        "status": 2,
        "price": 104.69,
        "date": "2016-07-31 19:26:25"
    }, {
        "id": 35,
        "name": "Walker",
        "status": 2,
        "price": 78.49,
        "date": "2016-02-22 14:54:32"
    }, {
        "id": 36,
        "name": "Rodriguez",
        "status": 3,
        "price": 108.6,
        "date": "2016-12-05 06:35:22"
    }],
    "quote": {
        "name": "Joho Doe",
        "title": "Graphic Designer",
        "content": "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
        "avatar": "http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236"
    },
    "numbers": [{
        "icon": "pay-circle-o",
        "color": "#64ea91",
        "title": "Online Review",
        "number": 2781
    }, {
        "icon": "team",
        "color": "#8fc9fb",
        "title": "New Customers",
        "number": 3241
    }, {
        "icon": "message",
        "color": "#d897eb",
        "title": "Active Projects",
        "number": 253
    }, {
        "icon": "shopping-cart",
        "color": "#f69899",
        "title": "Referrals",
        "number": 4324
    }]
}'''


def get_user():
    return json.loads(user_config)


def get_routes():
    return json.loads(routes_config)


def get_dashboard():
    return json.loads(dashboard_config)
