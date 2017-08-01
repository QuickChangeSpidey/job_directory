(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('jobs.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'job', {
      title: 'Manage Jobs',
      state: 'admin.jobs.list'
    });
  }
}());
