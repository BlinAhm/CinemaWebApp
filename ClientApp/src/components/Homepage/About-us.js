(function () {
    'use strict';

    angular
        .module('app')
        .controller('About_us', About_us);

    About_us.$inject = ['$location'];

    function About_us($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'About_us';

        activate();

        function activate() { }
    }
})();
