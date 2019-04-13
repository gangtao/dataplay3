import uuid from 'uuid';
import mockjs from 'mockjs';
import { parse } from 'url';

const {Random} = mockjs;

Random.extend({
    jobStatus(date) {
        const status = ['INITIALIZED','TRAINING','VALIDATING','SUCCESS','FAILED'];
        return this.pick(status);
    },
    jobType(date) {
        const type = ['AutoClassificationJob','AutoRegressionJob','TimeSerialsForecastsJob'];
        return this.pick(type);
    }
})

function fakeJobList(count) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
        list.push({
            id: uuid.v4(),
            status: Random.jobStatus(),
            type: Random.jobType(),
            name: Random.word(),
            start_time: new Date().getTime() / 1000,
        })
    }
    return list;
}

let jobs = fakeJobList(10);

const regressionJobDetails = {
    "dataset_id": "housing",
    "job_option": {
        "time_left_for_this_task": 30,
        "per_run_time_limit": 10,
        "initial_configurations_via_metalearning": 25,
        "ensemble_size": 50,
        "ensemble_nbest": 50,
        "ensemble_memory_limit": 1024,
        "ml_memory_limit": 2048,
        "tmp_folder": "\/tmp\/dataplay\/mljobs\/8205f310-8bf7-4a14-869b-1177b49f46cd\/tmp",
        "output_folder": "\/tmp\/dataplay\/mljobs\/8205f310-8bf7-4a14-869b-1177b49f46cd\/output"
    },
    "validation_option": {
        "test_size": 0.1,
        "random_state": 42,
        "shuffle": true
    },
    "features": ["crime_rate", "business_acres", "avg_rooms_per_dwelling", "distance_to_employment_center"],
    "targets": ["median_house_value"],
    "validation_result": {
        "r2": 0.6618103002,
        "mean_squared_error": 37.074986561,
        "mean_absolute_error": 3.7652134675,
        "median_absolute_error": 3.0310683823
    },
    "status": "SUCCESS"
}

const classificationJobDetail = {
    "dataset_id": "iris",
    "job_option": {
        "time_left_for_this_task": 30,
        "per_run_time_limit": 10,
        "initial_configurations_via_metalearning": 25,
        "ensemble_size": 50,
        "ensemble_nbest": 50,
        "ensemble_memory_limit": 1024,
        "ml_memory_limit": 2048,
        "tmp_folder": "\/tmp\/dataplay\/mljobs\/845f1252-aaca-4f20-a188-6e01ee18ce23\/tmp",
        "output_folder": "\/tmp\/dataplay\/mljobs\/845f1252-aaca-4f20-a188-6e01ee18ce23\/output"
    },
    "validation_option": {
        "test_size": 0.1,
        "random_state": 42,
        "shuffle": true
    },
    "features": ["sepal_length", "sepal_width", "petal_length", "petal_width"],
    "targets": ["species"],
    "validation_result": {
        "accuracy": 1.0,
        "f1": 1.0,
        "precision": 1.0,
        "recall": 1.0,
        "confusion_matrix": {
            "value": [
                [6, 0, 0],
                [0, 6, 0],
                [0, 0, 3]
            ],
            "lables": ["Iris Setosa", "Iris Versicolor", "Iris Virginica"]
        }
    },
    "type": "AutoClassificationJob",
    "start_time": 1555051321.3072459698,
    "end_time": 1555051350.8225090504,
    "model_representation": "[(0.200000, SimpleClassificationPipeline({'balancing:strategy': 'none', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'extra_trees', 'imputation:strategy': 'most_frequent', 'preprocessor:__choice__': 'fast_ica', 'rescaling:__choice__': 'robust_scaler', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'True', 'classifier:extra_trees:bootstrap': 'True', 'classifier:extra_trees:criterion': 'entropy', 'classifier:extra_trees:max_depth': 'None', 'classifier:extra_trees:max_features': 0.7062102387181676, 'classifier:extra_trees:max_leaf_nodes': 'None', 'classifier:extra_trees:min_impurity_decrease': 0.0, 'classifier:extra_trees:min_samples_leaf': 1, 'classifier:extra_trees:min_samples_split': 20, 'classifier:extra_trees:min_weight_fraction_leaf': 0.0, 'classifier:extra_trees:n_estimators': 100, 'preprocessor:fast_ica:algorithm': 'parallel', 'preprocessor:fast_ica:fun': 'exp', 'preprocessor:fast_ica:whiten': 'True', 'rescaling:robust_scaler:q_max': 0.7065776353150109, 'rescaling:robust_scaler:q_min': 0.23782974987118102, 'categorical_encoding:one_hot_encoding:minimum_fraction': 0.010000000000000004, 'preprocessor:fast_ica:n_components': 100},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.180000, SimpleClassificationPipeline({'balancing:strategy': 'weighting', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'extra_trees', 'imputation:strategy': 'most_frequent', 'preprocessor:__choice__': 'fast_ica', 'rescaling:__choice__': 'robust_scaler', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:extra_trees:bootstrap': 'False', 'classifier:extra_trees:criterion': 'gini', 'classifier:extra_trees:max_depth': 'None', 'classifier:extra_trees:max_features': 0.609975998293528, 'classifier:extra_trees:max_leaf_nodes': 'None', 'classifier:extra_trees:min_impurity_decrease': 0.0, 'classifier:extra_trees:min_samples_leaf': 1, 'classifier:extra_trees:min_samples_split': 2, 'classifier:extra_trees:min_weight_fraction_leaf': 0.0, 'classifier:extra_trees:n_estimators': 100, 'preprocessor:fast_ica:algorithm': 'parallel', 'preprocessor:fast_ica:fun': 'logcosh', 'preprocessor:fast_ica:whiten': 'True', 'rescaling:robust_scaler:q_max': 0.8430415644014919, 'rescaling:robust_scaler:q_min': 0.2863750565331575, 'preprocessor:fast_ica:n_components': 2000},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.160000, SimpleClassificationPipeline({'balancing:strategy': 'weighting', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'extra_trees', 'imputation:strategy': 'median', 'preprocessor:__choice__': 'fast_ica', 'rescaling:__choice__': 'none', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:extra_trees:bootstrap': 'False', 'classifier:extra_trees:criterion': 'entropy', 'classifier:extra_trees:max_depth': 'None', 'classifier:extra_trees:max_features': 0.5765793990908161, 'classifier:extra_trees:max_leaf_nodes': 'None', 'classifier:extra_trees:min_impurity_decrease': 0.0, 'classifier:extra_trees:min_samples_leaf': 11, 'classifier:extra_trees:min_samples_split': 20, 'classifier:extra_trees:min_weight_fraction_leaf': 0.0, 'classifier:extra_trees:n_estimators': 100, 'preprocessor:fast_ica:algorithm': 'deflation', 'preprocessor:fast_ica:fun': 'exp', 'preprocessor:fast_ica:whiten': 'True', 'preprocessor:fast_ica:n_components': 10},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.160000, SimpleClassificationPipeline({'balancing:strategy': 'weighting', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'sgd', 'imputation:strategy': 'median', 'preprocessor:__choice__': 'fast_ica', 'rescaling:__choice__': 'minmax', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:sgd:alpha': 3.27041927277584e-06, 'classifier:sgd:average': 'True', 'classifier:sgd:fit_intercept': 'True', 'classifier:sgd:learning_rate': 'invscaling', 'classifier:sgd:loss': 'modified_huber', 'classifier:sgd:penalty': 'elasticnet', 'classifier:sgd:tol': 0.05517964277254504, 'preprocessor:fast_ica:algorithm': 'parallel', 'preprocessor:fast_ica:fun': 'cube', 'preprocessor:fast_ica:whiten': 'False', 'classifier:sgd:epsilon': 0.00010000000000000009, 'classifier:sgd:eta0': 0.033157325660763994, 'classifier:sgd:l1_ratio': 0.0008114527992546483, 'classifier:sgd:power_t': 0.13714427818877545},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.120000, SimpleClassificationPipeline({'balancing:strategy': 'none', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'extra_trees', 'imputation:strategy': 'most_frequent', 'preprocessor:__choice__': 'random_trees_embedding', 'rescaling:__choice__': 'robust_scaler', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:extra_trees:bootstrap': 'False', 'classifier:extra_trees:criterion': 'entropy', 'classifier:extra_trees:max_depth': 'None', 'classifier:extra_trees:max_features': 0.39536192447534535, 'classifier:extra_trees:max_leaf_nodes': 'None', 'classifier:extra_trees:min_impurity_decrease': 0.0, 'classifier:extra_trees:min_samples_leaf': 19, 'classifier:extra_trees:min_samples_split': 3, 'classifier:extra_trees:min_weight_fraction_leaf': 0.0, 'classifier:extra_trees:n_estimators': 100, 'preprocessor:random_trees_embedding:bootstrap': 'False', 'preprocessor:random_trees_embedding:max_depth': 5, 'preprocessor:random_trees_embedding:max_leaf_nodes': 'None', 'preprocessor:random_trees_embedding:min_samples_leaf': 11, 'preprocessor:random_trees_embedding:min_samples_split': 11, 'preprocessor:random_trees_embedding:min_weight_fraction_leaf': 1.0, 'preprocessor:random_trees_embedding:n_estimators': 12, 'rescaling:robust_scaler:q_max': 0.8928631650245873, 'rescaling:robust_scaler:q_min': 0.1581877760687084},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.080000, SimpleClassificationPipeline({'balancing:strategy': 'weighting', 'categorical_encoding:__choice__': 'no_encoding', 'classifier:__choice__': 'extra_trees', 'imputation:strategy': 'most_frequent', 'preprocessor:__choice__': 'extra_trees_preproc_for_classification', 'rescaling:__choice__': 'none', 'classifier:extra_trees:bootstrap': 'False', 'classifier:extra_trees:criterion': 'entropy', 'classifier:extra_trees:max_depth': 'None', 'classifier:extra_trees:max_features': 0.9541039630394388, 'classifier:extra_trees:max_leaf_nodes': 'None', 'classifier:extra_trees:min_impurity_decrease': 0.0, 'classifier:extra_trees:min_samples_leaf': 16, 'classifier:extra_trees:min_samples_split': 14, 'classifier:extra_trees:min_weight_fraction_leaf': 0.0, 'classifier:extra_trees:n_estimators': 100, 'preprocessor:extra_trees_preproc_for_classification:bootstrap': 'True', 'preprocessor:extra_trees_preproc_for_classification:criterion': 'entropy', 'preprocessor:extra_trees_preproc_for_classification:max_depth': 'None', 'preprocessor:extra_trees_preproc_for_classification:max_features': 0.9082628722828775, 'preprocessor:extra_trees_preproc_for_classification:max_leaf_nodes': 'None', 'preprocessor:extra_trees_preproc_for_classification:min_impurity_decrease': 0.0, 'preprocessor:extra_trees_preproc_for_classification:min_samples_leaf': 2, 'preprocessor:extra_trees_preproc_for_classification:min_samples_split': 18, 'preprocessor:extra_trees_preproc_for_classification:min_weight_fraction_leaf': 0.0, 'preprocessor:extra_trees_preproc_for_classification:n_estimators': 100},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.060000, SimpleClassificationPipeline({'balancing:strategy': 'weighting', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'random_forest', 'imputation:strategy': 'most_frequent', 'preprocessor:__choice__': 'select_percentile_classification', 'rescaling:__choice__': 'standardize', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:random_forest:bootstrap': 'False', 'classifier:random_forest:criterion': 'gini', 'classifier:random_forest:max_depth': 'None', 'classifier:random_forest:max_features': 0.7983157215145903, 'classifier:random_forest:max_leaf_nodes': 'None', 'classifier:random_forest:min_impurity_decrease': 0.0, 'classifier:random_forest:min_samples_leaf': 4, 'classifier:random_forest:min_samples_split': 15, 'classifier:random_forest:min_weight_fraction_leaf': 0.0, 'classifier:random_forest:n_estimators': 100, 'preprocessor:select_percentile_classification:percentile': 50.0, 'preprocessor:select_percentile_classification:score_func': 'chi2'},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.020000, SimpleClassificationPipeline({'balancing:strategy': 'none', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'libsvm_svc', 'imputation:strategy': 'most_frequent', 'preprocessor:__choice__': 'no_preprocessing', 'rescaling:__choice__': 'standardize', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:libsvm_svc:C': 6.342897164595882, 'classifier:libsvm_svc:gamma': 0.2229870623330047, 'classifier:libsvm_svc:kernel': 'rbf', 'classifier:libsvm_svc:max_iter': -1, 'classifier:libsvm_svc:shrinking': 'False', 'classifier:libsvm_svc:tol': 2.006345264381097e-05},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n(0.020000, SimpleClassificationPipeline({'balancing:strategy': 'none', 'categorical_encoding:__choice__': 'one_hot_encoding', 'classifier:__choice__': 'gradient_boosting', 'imputation:strategy': 'mean', 'preprocessor:__choice__': 'fast_ica', 'rescaling:__choice__': 'standardize', 'categorical_encoding:one_hot_encoding:use_minimum_fraction': 'False', 'classifier:gradient_boosting:criterion': 'mse', 'classifier:gradient_boosting:learning_rate': 0.2155613360930585, 'classifier:gradient_boosting:loss': 'deviance', 'classifier:gradient_boosting:max_depth': 4, 'classifier:gradient_boosting:max_features': 0.31988031161984326, 'classifier:gradient_boosting:max_leaf_nodes': 'None', 'classifier:gradient_boosting:min_impurity_decrease': 0.0, 'classifier:gradient_boosting:min_samples_leaf': 8, 'classifier:gradient_boosting:min_samples_split': 13, 'classifier:gradient_boosting:min_weight_fraction_leaf': 0.0, 'classifier:gradient_boosting:n_estimators': 275, 'classifier:gradient_boosting:subsample': 0.28870176110739404, 'preprocessor:fast_ica:algorithm': 'parallel', 'preprocessor:fast_ica:fun': 'logcosh', 'preprocessor:fast_ica:whiten': 'False'},\ndataset_properties={\n  'task': 2,\n  'sparse': False,\n  'multilabel': False,\n  'multiclass': True,\n  'target_type': 'classification',\n  'signed': False})),\n]",
    "model_stats": "auto-sklearn results:\n  Dataset name: 16b067ade7fb39f1649c52a35bb29af4\n  Metric: accuracy\n  Best validation score: 1.000000\n  Number of target algorithm runs: 14\n  Number of successful target algorithm runs: 13\n  Number of crashed target algorithm runs: 1\n  Number of target algorithms that exceeded the time limit: 0\n  Number of target algorithms that exceeded the memory limit: 0\n",
    "status": "SUCCESS"
}

const timeForcastJobDetails = {
    "dataset_id": "air_passengers",
    "job_option": {
        "time_format": null
    },
    "features": ["Date"],
    "targets": ["Number"],
    "start_time": 1554777282.3254179955,
    "end_time": 1554777282.4133169651,
    "status": "SUCCESS"
}

const fakePrediction = {
    "cols": ["sepal_length", "sepal_width", "petal_length", "petal_width", "species", "prediction"],
    "rows": [
        [5.1, 3.5, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.0, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.7, 3.2, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.1, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.6, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.9, 1.7, 0.4, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.4, 1.4, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.4, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.4, 2.9, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.7, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.4, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.0, 1.4, 0.1, "Iris Setosa", "Iris Setosa"],
        [4.3, 3.0, 1.1, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.8, 4.0, 1.2, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.7, 4.4, 1.5, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.9, 1.3, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.5, 1.4, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.7, 3.8, 1.7, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.8, 1.5, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.4, 1.7, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.7, 1.5, 0.4, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.6, 1.0, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.3, 1.7, 0.5, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.4, 1.9, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.0, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.4, 1.6, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.2, 3.5, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.2, 3.4, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.7, 3.2, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.1, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.4, 3.4, 1.5, 0.4, "Iris Setosa", "Iris Setosa"],
        [5.2, 4.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.5, 4.2, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.2, 1.2, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.5, 3.5, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.9, 3.1, 1.5, 0.1, "Iris Setosa", "Iris Setosa"],
        [4.4, 3.0, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.4, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.5, 1.3, 0.3, "Iris Setosa", "Iris Setosa"],
        [4.5, 2.3, 1.3, 0.3, "Iris Setosa", "Iris Setosa"],
        [4.4, 3.2, 1.3, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.5, 1.6, 0.6, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.8, 1.9, 0.4, "Iris Setosa", "Iris Setosa"],
        [4.8, 3.0, 1.4, 0.3, "Iris Setosa", "Iris Setosa"],
        [5.1, 3.8, 1.6, 0.2, "Iris Setosa", "Iris Setosa"],
        [4.6, 3.2, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.3, 3.7, 1.5, 0.2, "Iris Setosa", "Iris Setosa"],
        [5.0, 3.3, 1.4, 0.2, "Iris Setosa", "Iris Setosa"],
        [7.0, 3.2, 4.7, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [6.4, 3.2, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.9, 3.1, 4.9, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.3, 4.0, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.5, 2.8, 4.6, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.8, 4.5, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 3.3, 4.7, 1.6, "Iris Versicolor", "Iris Versicolor"],
        [4.9, 2.4, 3.3, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [6.6, 2.9, 4.6, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.2, 2.7, 3.9, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.0, 2.0, 3.5, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.9, 3.0, 4.2, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 2.2, 4.0, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 2.9, 4.7, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 2.9, 3.6, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.7, 3.1, 4.4, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 3.0, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.8, 2.7, 4.1, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [6.2, 2.2, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 2.5, 3.9, 1.1, "Iris Versicolor", "Iris Versicolor"],
        [5.9, 3.2, 4.8, 1.8, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 2.8, 4.0, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 2.5, 4.9, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 2.8, 4.7, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [6.4, 2.9, 4.3, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.6, 3.0, 4.4, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [6.8, 2.8, 4.8, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [6.7, 3.0, 5.0, 1.7, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 2.9, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.6, 3.5, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.4, 3.8, 1.1, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.4, 3.7, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.8, 2.7, 3.9, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 2.7, 5.1, 1.6, "Iris Versicolor", "Iris Virginica"],
        [5.4, 3.0, 4.5, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.0, 3.4, 4.5, 1.6, "Iris Versicolor", "Iris Versicolor"],
        [6.7, 3.1, 4.7, 1.5, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 2.3, 4.4, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 3.0, 4.1, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.5, 4.0, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.5, 2.6, 4.4, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [6.1, 3.0, 4.6, 1.4, "Iris Versicolor", "Iris Versicolor"],
        [5.8, 2.6, 4.0, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [5.0, 2.3, 3.3, 1.0, "Iris Versicolor", "Iris Versicolor"],
        [5.6, 2.7, 4.2, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 3.0, 4.2, 1.2, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.9, 4.2, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.2, 2.9, 4.3, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [5.1, 2.5, 3.0, 1.1, "Iris Versicolor", "Iris Versicolor"],
        [5.7, 2.8, 4.1, 1.3, "Iris Versicolor", "Iris Versicolor"],
        [6.3, 3.3, 6.0, 2.5, "Iris Virginica", "Iris Virginica"],
        [5.8, 2.7, 5.1, 1.9, "Iris Virginica", "Iris Virginica"],
        [7.1, 3.0, 5.9, 2.1, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.9, 5.6, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.0, 5.8, 2.2, "Iris Virginica", "Iris Virginica"],
        [7.6, 3.0, 6.6, 2.1, "Iris Virginica", "Iris Virginica"],
        [4.9, 2.5, 4.5, 1.7, "Iris Virginica", "Iris Virginica"],
        [7.3, 2.9, 6.3, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.7, 2.5, 5.8, 1.8, "Iris Virginica", "Iris Virginica"],
        [7.2, 3.6, 6.1, 2.5, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.2, 5.1, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.4, 2.7, 5.3, 1.9, "Iris Virginica", "Iris Virginica"],
        [6.8, 3.0, 5.5, 2.1, "Iris Virginica", "Iris Virginica"],
        [5.7, 2.5, 5.0, 2.0, "Iris Virginica", "Iris Virginica"],
        [5.8, 2.8, 5.1, 2.4, "Iris Virginica", "Iris Virginica"],
        [6.4, 3.2, 5.3, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.0, 5.5, 1.8, "Iris Virginica", "Iris Virginica"],
        [7.7, 3.8, 6.7, 2.2, "Iris Virginica", "Iris Virginica"],
        [7.7, 2.6, 6.9, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.0, 2.2, 5.0, 1.5, "Iris Virginica", "Iris Virginica"],
        [6.9, 3.2, 5.7, 2.3, "Iris Virginica", "Iris Virginica"],
        [5.6, 2.8, 4.9, 2.0, "Iris Virginica", "Iris Virginica"],
        [7.7, 2.8, 6.7, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.7, 4.9, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.3, 5.7, 2.1, "Iris Virginica", "Iris Virginica"],
        [7.2, 3.2, 6.0, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.2, 2.8, 4.8, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.1, 3.0, 4.9, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.4, 2.8, 5.6, 2.1, "Iris Virginica", "Iris Virginica"],
        [7.2, 3.0, 5.8, 1.6, "Iris Virginica", "Iris Virginica"],
        [7.4, 2.8, 6.1, 1.9, "Iris Virginica", "Iris Virginica"],
        [7.9, 3.8, 6.4, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.4, 2.8, 5.6, 2.2, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.8, 5.1, 1.5, "Iris Virginica", "Iris Virginica"],
        [6.1, 2.6, 5.6, 1.4, "Iris Virginica", "Iris Virginica"],
        [7.7, 3.0, 6.1, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.3, 3.4, 5.6, 2.4, "Iris Virginica", "Iris Virginica"],
        [6.4, 3.1, 5.5, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.0, 3.0, 4.8, 1.8, "Iris Virginica", "Iris Virginica"],
        [6.9, 3.1, 5.4, 2.1, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.1, 5.6, 2.4, "Iris Virginica", "Iris Virginica"],
        [6.9, 3.1, 5.1, 2.3, "Iris Virginica", "Iris Virginica"],
        [5.8, 2.7, 5.1, 1.9, "Iris Virginica", "Iris Virginica"],
        [6.8, 3.2, 5.9, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.3, 5.7, 2.5, "Iris Virginica", "Iris Virginica"],
        [6.7, 3.0, 5.2, 2.3, "Iris Virginica", "Iris Virginica"],
        [6.3, 2.5, 5.0, 1.9, "Iris Virginica", "Iris Virginica"],
        [6.5, 3.0, 5.2, 2.0, "Iris Virginica", "Iris Virginica"],
        [6.2, 3.4, 5.4, 2.3, "Iris Virginica", "Iris Virginica"],
        [5.9, 3.0, 5.1, 1.8, "Iris Virginica", "Iris Virginica"]
    ]
}

function getJobs(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;
    if ( params.type ) {
        const job = jobs.filter(item => {
            return item.type === params.type
        });
        res.status(200).json(job);
    } else {
        res.status(200).json(jobs);
    } 
}

function getJob(req, res) {
    const { id } = req.params;
    let job = jobs.find(item => item.id === id);
    if ( job.type == 'AutoClassificationJob') {
        job = { ...job, ...classificationJobDetail};
    } else if ( job.type == 'AutoRegressionJob' ) {
        job = { ...job, ...regressionJobDetails};
    } else if ( job.type == 'TimeSerialsForecastsJob' ) {
        job = { ...job, ...timeForcastJobDetails};
    }

    job.status = Random.jobStatus();
    res.status(200).json(job);
}

function createJob(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const job = {...body};
    job.id = uuid.v4();
    job.status = Random.jobStatus();
    job.start_time = new Date().getTime() / 1000;
    jobs.push(job);
    res.status(200).json(job);
}

function deleteJob(req, res) {
    const { id } = req.params;
    jobs = jobs.filter(function(value, index, arr){
        return value.id !== id;
    });
    res.status(204).json({});
}

function predict(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const payload = {...body};
    res.status(200).json(fakePrediction);
}

export default {
    'GET /api/ml_jobs': getJobs,
    'GET /api/ml_jobs/:id': getJob,
    'POST /api/ml_jobs': createJob,
    'DELETE /api/ml_jobs/:id': deleteJob,
    'POST /api/ml_jobs/:id/predict': predict,
};