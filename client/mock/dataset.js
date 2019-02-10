import { Mock, Constant } from './_utils'

const { ApiPrefix } = Constant

let datasetId = 0
const database = Mock.mock({
  'data|5': [
    {
      id() {
        datasetId += 1
        return datasetId
      },
      name: '@word(3,10)',
      cols: Mock.mock({'data|5':['@word(3,10)']}).data,
      rows: Mock.mock({'data|10':[Mock.mock({'data|5':['@integer(0,100)']}).data]}).data,
    },
  ],
}).data

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {
  [`GET ${ApiPrefix}/datasets`](req, res) {
    let newData = database.map( function(item){
      return { 'id': item.id, 'name':item.name }
    })
    res.status(200).json({
      data: newData
    })
  },

  [`GET ${ApiPrefix}/datasets/:id`](req, res) {
    const { id } = req.params

    let newData = database.find( item => item.id == id)
    if (newData) {
      res.status(200).json({
        data: newData
      })
    } else {
      // 404 is not handled by the request component ui now
      res.status(404).json(NOTFOUND)
    }
  }
}