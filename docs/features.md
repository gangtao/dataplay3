## Dataplay3 Feature Introduction

### demo
[youtube](https://youtu.be/jm83LLYO3Es)

<iframe width="560" height="315" src="https://www.youtube.com/embed/jm83LLYO3Es?start=321" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

or [youku](http://player.youku.com/embed/XNDE0OTI3MjIzMg==)

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
dataset=iris | select sum(sepal_length),sum(sepal_width), species from dataset group by species
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

Dataplay3 supports three different prediction models:
* predict a numeric value **prediction -> numerical**
* predict a categorical value **prediction -> categorical**
* predict a value from time serials dataset **prediction -> time serial**

The first view is list of all the models of each type

<img src="./assets/screens/imgs/prediction_list.png" width="800">

Click `create a new prediction` button to create a new model

<img src="./assets/screens/imgs/prediction_creation.png" width="800">

For numerical and catagorical prediction, leveraging auto ml, you do not need to worry about what algorithm to use or what parameter to chose, server will search with one is best for you, you just need to select dataset, feature to use and prediction target. with advance options, you can chose how to validate the model, and some resource/time limitation you want to set when training the job. for more details refer to [auto-sklearn](https://automl.github.io/auto-sklearn/master/manual.html)

For time serial, the difference is that you have to select which field is the time field.

After training completed, the validation result will show on the details page.

For categorical prediction model, you will get `accuracy`,`f1`,`recall`,`precision` and a chart of `confusion matrix`

<img src="./assets/screens/imgs/prediction_cat_details.png" width="800">

For categorical prediction model, you will get `accuracy`,`f1`,`recall`,`precision`

<img src="./assets/screens/imgs/prediction_num_details.png" width="800">

For time serial model, you will get prediction trend chart

<img src="./assets/screens/imgs/prediction_time_details.png" width="800">

To use your model, click the `predict` link in the list view of your model, select a dataset and check what the prediction result

<img src="./assets/screens/imgs/prediction_predict.png" width="800">

Deploy the mode is not implemented yet.



### configurations

You can manage server side configuration through **configuration**

<img src="./assets/screens/imgs/configuration.png" width="800">
