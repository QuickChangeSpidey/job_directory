(function () {
  'use strict';

  angular
    .module('jobs')
    .controller('JobsListController', JobsController);

  JobsListController.$inject = ['JobsService'];

  function JobsListController(JobsService) {
    var vm = this;

    vm.jobs = JobsService.query();
  }
}());
