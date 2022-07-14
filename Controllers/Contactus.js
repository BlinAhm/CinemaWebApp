
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Contactus', Contactus);

    Contactus.$inject = ['$location'];

    function Contactus($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Contactus';

        activate();

        function activate() { }
    }
})();
