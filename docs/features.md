## Dataplay3 Feature Introduction
### workflow

Following diagram shows the basic workflow of dataplay3:
1. prepare your data as csv, import it as dataset
2. you can run query to transform your dataset into a new result
3. you can visualize your dataset or query result using grammar drive data visualiztion or typed chart
4. you can use dataset to build a prediction model, where the target could be a numeric value, a ctagorical value, or time serials related prediction.
5. you can use prediction model to predict using a new dataset

<img src="./assets/dataplay3_workflow.png" width="400">

```plantuml
@startuml

title Dataplay3 Workflow

state csv
state dataset
state query
state chart

csv --> dataset : import
dataset --> query : query
dataset --> chart : visualize
query --> chart : visualize
chart --> dashboard : build
dataset --> predict_model : create
dataset --> predict_result : predict
predict_model --> predict_result : predict

@enduml
```

### manage dataset

The first thing you need to do is to have a dateset, with page **dataset -> import data** you can import a csv file or using those sample dataset provided by dataplay3.
<img src="./assets/screens/imgs/dataset_import_1.png" width="800">
<img src="./assets/screens/imgs/dataset_import_2.png" width="800">
<img src="./assets/screens/imgs/dataset_import_3.png" width="800">

Do not forget to click save button to save the dataset in the final step.

With page **dataset -> view**, you can view your current dataset
<img src="./assets/screens/imgs/dataset_view.png" width="800">

With page **dataset -> query**, you can run a query to query dataset and save the result for future visualization

<img src="./assets/screens/imgs/dataset_query.png" width="800">

the query should be in following grammer:
```
dataset=<dataset_name> type=(sql|query) name=<query_name> | query
```

Two types of query is now supported:
* [pandas dataset query](http://jose-coto.com/query-method-pandas)
* [sql query](https://github.com/yhat/pandasql/) , now a simple sql query is supported, can only support one dataset with `from dataset` as condition.

Here are some query samples:
```
dataset=iris name=query1 type=sql | select sum(sepal_length),sum(sepal_width), species from dataset group by species
dataset=nasdaq name=query1 type=sql | select * from dataset ORDER BY Date Desc Limit 1000
dataset=iris type=query | species == "Iris Setosa"
```
Click `save dataset query` button to save the query result.  `dataset` is required, `type` default to `sql` and `name` is required when you want to save the query result.

With page **dataset -> manage**, you can view/delete your dataset or saved query, also you can export your saved query to a dataset
<img src="./assets/screens/imgs/dataset_manage_1.png" width="800">
<img src="./assets/screens/imgs/dataset_manage_2.png" width="800">


### dataset visualization

With page **visualizaion -> grammar driven**, you can build a visualiztion using grammer driven data visualization, similar as [tabeau](https://www.tableau.com/) or [ggplot](http://ggplot.yhathq.com/). It is base on [ant g2](https://github.com/antvis/g2), for more information about how that grammer works, refer to [doc](https://antv.alipay.com/zh-cn/g2/3.x/index.html)

<img src="./assets/screens/imgs/visualization_gg.png" width="800">

You may feel it is hard to use those grammer to build visualization, dataplay provides build-in chart types like `pie`,`bar`,`line`, with grammer of graphics, it is easy to add new type support. refer to [chart config](https://github.com/gangtao/dataplay3/blob/master/client/src/components/Visualization/ChartConfig.js) about how to extend new chart type.

<img src="./assets/screens/imgs/visualization_type.png" width="800">

After the visualzation has been build, you can click `export to dashboard` button to save it to dashboard.

<img src="./assets/screens/imgs/dashboard.png" width="800">

Now it is a very simple dashboard with list of visualizations, now drag and drop and other layout support.  You can `maximize` or `delete` specific chart from dashboard.

### make prediction
<img src="./assets/screens/imgs/prediction_list.png" width="800">
<img src="./assets/screens/imgs/prediction_creation.png" width="800">

<img src="./assets/screens/imgs/prediction_cat_details.png" width="800">
<img src="./assets/screens/imgs/prediction_num_details.png" width="800">
<img src="./assets/screens/imgs/prediction_time_details.png" width="800">

### configurations

You can manage server side configuration through **configuration**
<img src="./assets/screens/imgs/configuration.png" width="800">
