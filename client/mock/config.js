const configs = {
    'server': {
        "server": {
            "host": "0.0.0.0",
            "port": "8000",
            "debug": "true",
            "workers": "3"
        }
    },
    'dataset_type': {
        "csv": {
            "module": "dataplay.datasvc.csv",
            "class": "CSV"
        }
    },
    'datasets': {
        "iris": {
            "content": "iris.csv",
            "name": "iris",
            "type": "csv",
            "description": "This is perhaps the best known database to be found in the pattern recognition literature. Fisher's paper is a classic in the field and is referenced frequently to this day. (See Duda & Hart, for example.) The data set contains 3 classes of 50 instances each, where each class refers to a type of iris plant. One class is linearly separable from the other 2; the latter are NOT linearly separable from each other."
        },
        "housing": {
            "content": "housing.csv",
            "name": "housing",
            "type": "csv",
            "description": ""
        },
        "logins": {
            "content": "logins.csv",
            "name": "logins",
            "type": "csv",
            "description": ""
        }
    },
    'mljob': {
        "job": {
            "dir": "/tmp/dataplay/mljobs",
            "multi_processes": "true"
        },
        "validation_option": {
            "test_size": "0.1",
            "random_state": "42",
            "shuffle": "True"
        },
        "auto_ml": {
            "time_left_for_this_task": "120",
            "per_run_time_limit": "30",
            "initial_configurations_via_metalearning": "25",
            "ensemble_size": "50",
            "ensemble_nbest": "50",
            "ensemble_memory_limit": "1024",
            "ml_memory_limit": "2048"
        },
        "auto_ml_algorithms": {
            "regressors": "adaboost,ard_regression,decision_tree,extra_trees,gaussian_process,gradient_boosting,k_nearest_neighbors,liblinear_svr,libsvm_svr,random_forest,ridge_regression,sgd,xgradient_boosting",
            "classifiers": "adaboost,bernoulli_nb,decision_tree,extra_trees,gaussian_nb,gradient_boosting,k_nearest_neighbors,lda,liblinear_svc,libsvm_svc,multinomial_nb,passive_aggressive,qda,random_forest,sgd,xgradient_boosting",
            "preprocessors": "densifier,extra_trees_preproc_for_classification,extra_trees_preproc_for_regression,fast_ica,feature_agglomeration,kernel_pca,kitchen_sinks,liblinear_svc_preprocessor,no_preprocessing,nystroem_sampler,pca,polynomial,random_trees_embedding,select_percentile,select_percentile_classification,select_percentile_regression,select_rates,truncatedSVD"
        }
    }
}

function getConfigurations(req, res) {
    res.status(200).json(Object.keys(configs));
}

function getConfiguration(req, res) {
    const {
        domain
    } = req.params;
    res.status(200).json(configs[domain]);
}

function saveConfiguration(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const {
        domain
    } = req.params;
    configs[domain] = body
    res.status(200).json({});
}

export default {
    'GET /api/confs': getConfigurations,
    'GET /api/confs/:domain': getConfiguration,
    'POST /api/confs/:domain': saveConfiguration,
};