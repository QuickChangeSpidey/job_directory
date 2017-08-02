(function() {
    'use strict';

    angular
        .module('jobs')
        .controller('JobsController', JobsController);

    JobsController.$inject = ['$scope', '$stateParams', 'jobResolve', '$location', 'Authentication'];

    function JobsController($scope, $stateParams, job, $location, Authentication) {
        var vm = this;
        vm.job = job;
        vm.authentication = Authentication;
        var Jobs;
        $scope.create = function() {
            var job = new Jobs({
                title: this.title,
                company: this.company,
                description: this.description,
                hourly_wage: this.hourly_wage,
                requirements: this.requirements,
                state: this.state,
                contact_email: this.contact_email
            });
            job.$save(function(response) {
                $location.path('jobs/' + response._id);
                $scope.title = '';
                $scope.company = '';
                $scope.description = '';
                $scope.requirements = '';
                $scope.hourly_wage = '';
                $scope.state = '';
                $scope.contact_email = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.remove = function(job) {
            if (job) {
                job.$remove();

                for (var i in $scope.jobs) {
                    if ($scope.jobs[i] === job) {
                        $scope.jobs.splice(i, 1);
                    }
                }
            } else {
                $scope.job.$remove(function() {
                    $location.path('jobs');
                });
            }
        };
        $scope.update = function() {
            var job = $scope.job;
            job.$update(function() {
                $location.path('jobs/' + job._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.find = function() {
            $scope.jobs = Jobs.query();
        };
        $scope.findOne = function() {
            $scope.job = Jobs.get({
                jobId: $stateParams.jobId
            });
        };
    }
}());