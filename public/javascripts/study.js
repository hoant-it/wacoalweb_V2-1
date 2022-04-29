scotchApp.controller('appController', ['$rootScope', '$http', '$routeParams', 'appService', '$location',
    function($rootScope, $http, $routeParams, appService, $location) {
        $rootScope.isBG = true;
        $('#content').removeClass('m-l-0');
        $('#header').addClass('bg-header');
        $('#content').addClass('b-t-2');
        $('#aside').removeClass('hide');
        $('#content .tab').removeClass('hide');
        //$rootScope.hasClassPTop115 = false;
        if ($('#user-login').attr('data-profileid') == '')
            appService.checkSession();
        var ProfileID = $('#user-login').attr('data-profileid'),
            SysUserID = $('#user-login').attr('data-userid'),
            UserNameLogin = $('#user-login').attr('data-userlogin'),
            UserLangLogin = $('#user-login').attr('data-lang'),
            idTabPre = '',
            arrPath = $rootScope.arrPath,
            _countArrPath = arrPath.length,
            eleTab = $location.$$path.split('/')[2],
            _hrService = GetApi()[1],
            langXmlSpec, langXml;
        $rootScope.titleTab;

        var getValueLang = function(key) {
            if ($routeParams.id)
                key = key.split('-')[0];
            if (!langXml) {
                $http.get(window.location.origin + '/New_Home/GetFileLang?lang=' + $('body').attr('data-lang')).success(function(data) {
                    var _split = data.split('202cb962ac59075b964b07152d234b70');
                    if (_split[0])
                        langXmlSpec = $($.parseXML(_split[0]));
                    if (_split[1])
                        langXml = $($.parseXML(_split[1]));
                    getValueLang(key);
                });
            } else {
                if (langXmlSpec) {
                    var _val = langXmlSpec.find('NewDataSet Language[Name="' + key + '"]').attr('Value');
                    if (_val) {
                        $rootScope.titleTab = _val;
                    } else {
                        _val = langXml.find('NewDataSet Language[Name="' + key + '"]').attr('Value');
                        if (_val) {
                            $rootScope.titleTab = _val;
                        } else {
                            $rootScope.titleTab = key;
                        }
                    }
                } else {
                    var _val = langXml.find('NewDataSet Language[Name="' + key + '"]').attr('Value');
                    if (_val) {
                        $rootScope.titleTab = _val;
                    } else {
                        $rootScope.titleTab = key;
                    }
                }
            }
        };

        $('#userLoginID').text($('#user-login').attr('data-fullname'));

        Loading(true);

        if ($location.$$path) {
            var count = 0;
            $('ul.nav-tabs li[data-path]').removeClass('active');
            $('div.tab-content div.tab-pane[data-path]').removeClass('active');
            for (var i = 0; i < _countArrPath; i++) {
                if (arrPath[i] == $location.$$path || ($routeParams.id && arrPath[i] == $location.$$path.substr(0, $location.$$path.lastIndexOf('/'))))
                    count = 1;
            }

            //load sub menu bên trái theo tab đang active
            var _hash = window.location.hash.replace('#/', '#');

            //trường hợp vào tab cấp 1, active tab cấp 2 thì set lại hash cho đúng đường dẫn
            if ($('#aside ul.menu-sidebar li a[href="' + _hash + '"]').length == 0 && window.location.hash.indexOf('-') >= 0)
                _hash = _hash.split('-')[0];

            var liSub = $('#aside ul.menu-sidebar li a[href="' + _hash + '"]').parent().parent().parent().find('li').clone();

            $('#content aside ul.menu-sidebar').html(liSub);
            $('#content aside ul.menu-sidebar li a[href="' + _hash + '"]').addClass('active');

            if (count == 0) {
                var idTab = 1;
                if ($('ul.nav-tabs li[data-path]').length > 0)
                    idTab = $('ul.nav-tabs li[data-path]').last().find('a').attr('data-target').replace('#', '') + 1;

                var li = '<li class="active" data-path="' + $location.$$path + '"><a data-target="#' + idTab + '" data-toggle="tab">' + 'loading...' + '</a><span data-path="' + $location.$$path + '" class="closed"><i class="glyphicon glyphicon-remove"></i></span></li>';

                var content = '<div class="tab-pane active" data-path="' + $location.$$path + '" id="' + idTab + '"></div>';

                getValueLang($location.$$search['tab']);

                $rootScope.$watch('titleTab', function(newVal) {
                    if (newVal)
                        $('li[data-path="' + $location.$$path + '"] > a').text(newVal);
                });

                if ($routeParams.id) {
                    var _tabName = $location.$$search['tab'].split('-');

                    li = '<li class="active" data-path="' + $location.$$path.substr(0, $location.$$path.lastIndexOf('/')) + '"><a data-target="#' + idTab + '" data-toggle="tab">' + _tabName[0] + '</a><span data-path="' + $location.$$path.substr(0, $location.$$path.lastIndexOf('/')) + '" class="closed"><i class="glyphicon glyphicon-remove"></i></span></li>';

                    content = '<div class="tab-pane active" data-path="' + $location.$$path.substr(0, $location.$$path.lastIndexOf('/')) + '" id="' + idTab + '"></div>';

                    $rootScope.$watch('titleTab', function(newVal) {
                        if (newVal)
                            $('li[data-path="' + $location.$$path.substr(0, $location.$$path.lastIndexOf('/')) + '"] > a').text(newVal);
                    });
                }
                $('ul.nav-tabs.tab-menu').append(li);
                $('div.tab-content.tab-menu').append(content);

                idTabPre = $('ul.nav-tabs li.active[data-path] a').attr('data-target');

                //set active cho menu left
                $('#content aside ul.menu-sidebar li').click(function() {
                    $('#content aside ul.menu-sidebar li a.active').removeClass('active');

                    $(this).find('a').addClass('active');
                });

                //check có hiển thị menu left theo local storage
                var _storage = localStorage.getItem('Vnr_Portal_Setting');
                if (_storage) {
                    var setting = JSON.parse(_storage);
                    if (setting.MenuLeft) {
                        $rootScope.dockaside = true;

                        if (setting.Expand) {
                            $('#isExpand').html('<i class="fa fa-outdent" aria-hidden="true"></i>');
                            $('#content aside, #content .tab, #isExpand').addClass('expand');
                        } else {
                            $('#isExpand').html('<i class="fa fa-indent" aria-hidden="true"></i>');
                            $('#content aside, #content .tab, #isExpand').addClass('colspan');
                        }

                        $('#content aside').removeClass('hide').addClass('show');
                    }
                }
                //chạy mặc định, show menu left, expand menu
                else {
                    //set menu left
                    $rootScope.dockaside = false;
                }

                //các tab trong menu nhân sự sẽ có id
                if ($routeParams.id) {
                    $('#' + idTab).load($location.$$path, function(response, status, xhr) {
                        if (status == 'success') {
                            if (_tabName[1]) {
                                $('ul.nav-tabs li a[data-target=#' + _tabName[1] + ']').parent().addClass('active');
                                $('#' + _tabName[1]).first().addClass('active');
                            } else {
                                $('#' + idTab + ' ul.nav-tabs li').first().addClass('active');
                                $('#' + idTab + ' div.tab-detail div.tab-pane').first().addClass('active');
                            }
                            var urlTabActive = $('.tab-custom div.active li.active').attr('data-url'),
                                tabActive = $('.tab-custom div.active li.active a').attr('data-target'),
                                param = $('.tab-custom div.active li.active').attr('param'),
                                arrTab = $rootScope.arrTab;
                            arrTab.push(tabActive);
                            var changMonth = '',
                                changMonth1 = '';
                            //set title tab for change lang                        
                            if ($location.$$search['tab'] == '1')
                                $('#list-ul-tab li.active a').text($('#personal-menu li.menu-active a span').text());
                            //tab công
                            if ($location.$$path == '/New_Personal/New_Attendance/1') {
                                $http.get(_hrService + 'Att_GetData/GetMultiCutOffDuration').success(function(data) {
                                    currMonth = '';
                                    var _countData = data.length,
                                        Today = new Date(),
                                        mm = Today.getMonth() + 1;
                                    if (mm < 10) {
                                        mm = '0' + mm
                                    }
                                    for (var i = 0; i < _countData; i++) {
                                        if (FormatDate(data[i].MonthYear).substr(3, 7) == mm + '/' + Today.getFullYear())
                                            currMonth = data[i].ID;
                                    }
                                    if (!currMonth)
                                        currMonth = data[0].ID;
                                    appService.getDataByTab(urlTabActive, param, tabActive, currMonth);
                                    $('#CutOffDuration_Att').kendoDropDownList({
                                        filter: 'contains',
                                        dataSource: data,
                                        dataTextField: 'CutOffDurationName',
                                        dataValueField: 'ID',
                                        value: currMonth,
                                        change: function() {
                                            changMonth1 = $('#CutOffDuration_Att').val();
                                            Loading(true);
                                            var _eleTab = $('.tab-custom div.active li.active');
                                            appService.getDataByTab(_eleTab.attr('data-url'), _eleTab.attr('param'), _eleTab.find('a').attr('data-target'), changMonth1);
                                        }
                                    });
                                    if ($('#list-ul-tab li.active').attr('data-path') == '/New_Personal/New_Attendance') {
                                        changMonth = $('#CutOffDuration_Att').val();
                                        changMonth1 = $('#CutOffDuration_Att').val();
                                    }
                                });
                            } else if ($location.$$path == '/New_Personal/New_SalaryInfo/1') { //tab lương                            
                                $http.get(_hrService + 'Att_GetData/GetMultiCutOffDuration').success(function(data) {
                                    currMonth = '';
                                    var _countData = data.length,
                                        Today = new Date(),
                                        mm = Today.getMonth() + 1;
                                    if (mm < 10) {
                                        mm = '0' + mm
                                    }
                                    for (var i = 0; i < _countData; i++) {
                                        if (FormatDate(data[i].MonthYear).substr(3, 7) == mm + '/' + Today.getFullYear())
                                            currMonth = data[i].ID;
                                    }
                                    if (!currMonth)
                                        currMonth = data[0].ID;
                                    appService.getDataByTab(urlTabActive, param, tabActive, currMonth);
                                    $('#CutOffDuration_Sal').kendoDropDownList({
                                        filter: 'contains',
                                        dataSource: data,
                                        dataTextField: 'CutOffDurationName',
                                        dataValueField: 'ID',
                                        value: currMonth,
                                        change: function(e) {
                                            Loading(true);
                                            var _eleTab = $('.tab-custom div.active li.active');
                                            appService.getDataByTab(_eleTab.attr('data-url'), _eleTab.attr('param'), _eleTab.find('a').attr('data-target'), changMonth1);
                                        }
                                    });
                                });
                                $http.get(_hrService + 'Cat_GetData/GetScreenName?screenName=Personal/Paysips').success(function(data) {
                                    var _val = '';
                                    if (data.length == 1)
                                        _val = data[0].ID;
                                    $('#template-exp').kendoDropDownList({
                                        filter: 'contains',
                                        dataSource: data,
                                        dataTextField: 'ExportName',
                                        dataValueField: 'ID',
                                        optionLabel: 'Chọn mẫu',
                                        value: _val
                                    });
                                });
                                $('#dr-Sal').removeClass('hide');
                                $('#dt-pita').addClass('hide');
                            } else {
                                appService.getDataByTab(urlTabActive, param, tabActive);
                            }

                            $('.btn-edit-detail a.k-edit').addClass('hide');
                            PermissionUdateTab(tabActive);
                            $('.view-detail ul.nav-tabs li').unbind('click');
                            $('.view-detail ul.nav-tabs li').click(function() {
                                $('#dr-Sal, #dt-pita').addClass('hide');
                                if ($('a[kendo-edit-detail]').hasClass('hide')) {
                                    $('a[kendo-save-detail], a[kendo-cancel-detail]').addClass('hide');
                                    $('a[kendo-edit-detail]').removeClass('hide');
                                }
                                if ($(this).find('a').attr('data-target') == '#New_Eva_Performance2') {
                                    if (!$('#MonthYearFrom').data('kendoDatePicker')) {
                                        var Today = new Date(),
                                            mm = Today.getMonth() + 1;
                                        if (mm < 10)
                                            mm = '0' + mm;
                                        $('#MonthYearFrom').kendoDatePicker({
                                            format: 'MM/yyyy',
                                            value: mm + '/' + Today.getFullYear(),
                                            change: changeMonthYear
                                        });
                                        $('#MonthYearTo').kendoDatePicker({
                                            format: 'MM/yyyy',
                                            value: mm + '/' + Today.getFullYear(),
                                            change: changeMonthYear
                                        });
                                        $('input[kendo-date-picker]').click(function() {
                                            $(this).data('kendoDatePicker').open();
                                        });

                                        function changeMonthYear() {
                                            Loading(true);
                                            appService.getDataByTab($('.tab-custom .tab-pane.active .view-detail ul.nav-tabs li.active').attr('data-url'), paramThis, tabThis);
                                        }
                                    }
                                    $('#dr-Sal').addClass('hide');
                                    $('#dt-pita').removeClass('hide');
                                } else if ($(this).find('a').attr('data-target') == '#New_Eva_Performance1') {
                                    $('#dt-pita').addClass('hide');
                                    $('#dr-Sal').removeClass('hide');
                                }
                                var urlTabThis = $(this).attr('data-url'),
                                    paramThis = $(this).attr('param'),
                                    tabThis = $(this).find('a').attr('data-target');
                                $('.btn-edit-detail a.k-edit').addClass('hide');
                                PermissionUdateTab(tabThis);
                                var countTab = 0;
                                for (var i = 0; i < arrTab.length; i++) {
                                    if (arrTab[i] == tabThis)
                                        countTab = 1;
                                }
                                if (countTab == 0) {
                                    Loading(true);
                                    if (tabThis == '#New_Attendance6') {
                                        $('#YearAnnual').val(CurrYear());
                                        $('#YearAnnual').blur(function() {
                                            Loading(true);
                                            appService.getDataByTab($('.tab-custom .tab-pane.active .view-detail ul.nav-tabs li.active').attr('data-url'), paramThis, tabThis);
                                        });
                                    }
                                    arrTab.push(tabThis);
                                    appService.getDataByTab(urlTabThis, paramThis, tabThis);
                                } else {

                                    var _datapath = $('#list-ul-tab li.active').attr('data-path');

                                    //load lại dữ liệu cho các tab công khi change tháng
                                    if (_datapath == '/New_Personal/New_Attendance') {

                                        if (changMonth != changMonth1) {
                                            Loading(true);
                                            appService.getDataByTab(urlTabThis, paramThis, tabThis);
                                            changMonth = changMonth1;
                                        }

                                        //ẩn control Kỳ công nếu là tab PHÉP NĂM
                                        else {
                                            if (tabThis == '#New_Attendance6') {
                                                $('#dr-att').addClass('hide');
                                            } else {
                                                $('#dr-att').removeClass('hide');
                                            }
                                        }
                                    }

                                    //ẩn hiện button chỉnh sửa khi thay đổi qua các tab thông tin cơ bản, cá nhân, thông tin liên hệ
                                    else if (tabThis == '#New_HR1' || tabThis == '#New_HR2' || tabThis == '#New_HR3') {
                                        appService.readOnlyCtrlInForm(tabThis, true);
                                    }
                                }
                            });

                            //Add title to Label_Tab                    
                            var elmAdd = $('div#' + idTab + ' .form-group label');
                            var totallbl = $(elmAdd).length;
                            addTitle(elmAdd, totallbl);

                            //Set Active Tab xs
                            var elmActive = $('.personal-menu-xs ul li[resource="New_Personal_' + eleTab + '_Portal"]');
                            setActiveTab(elmActive);
                        }
                    });
                    arrPath.push($location.$$path.substr(0, $location.$$path.lastIndexOf('/')));
                }

                //các tab trong menu yêu cầu hoặc duyệt
                else {
                    $('#' + idTab).load($location.$$path + '/New_Index', function(response, status, xhr) {
                        if (status == 'success') {
                            //set title tab for change lang
                            if ($location.$$search['tab'] == '1')
                                $('#list-ul-tab li.active a').text($('.menu-sidebar li.' + $location.$$search['key'] + ' a span').text());
                            var _isScheduler = false;
                            if ($location.$$search['tab'] == 'HRM_New_Attendance_New_Index')
                                _isScheduler = true;
                            appService.loadDataTab(ProfileID, SysUserID, UserNameLogin, UserLangLogin, _isScheduler);
                            if (!_isScheduler)
                                Loading(false);
                        }
                        //Add title to header
                        var elmAdd = $('div#' + idTab + ' .k-grid table thead tr th a'),
                            totallbl = $(elmAdd).length;
                        addTitle(elmAdd, totallbl);
                        //Set Active Tab
                        var eleTab0 = $location.$$path.split('/')[1];
                        var elmActive = $('.personal-menu-xs ul li[resource="' + eleTab0 + '_New_Index_Portal"]');
                        setActiveTab(elmActive);
                    });
                    arrPath.push($location.$$path);
                }
            } else {

                Loading(false);
                var _isBool = false;
                if ($routeParams.id) {
                    $location.$$path = $location.$$path.substr(0, $location.$$path.lastIndexOf('/'));
                    if ($location.$$search['tab']) {
                        var _tabName = '#' + $location.$$search['tab'].split('-')[1];
                        if ($('ul.nav-tabs li.active a').attr('data-target') != _tabName)
                            _isBool = true;
                    }
                    //Add title to Label_Tab                    
                    var elmAdd = $('div#' + idTab + ' .form-group label'),
                        totallbl = $(elmAdd).length;
                    addTitle(elmAdd, totallbl);
                    //Set Active Tab
                    var elmActive = $('.personal-menu-xs ul li[resource="New_Personal_' + eleTab + '_Portal"]');
                    setActiveTab(elmActive);
                }
                $('ul.nav-tabs li[data-path="' + $location.$$path + '"]').addClass('active');
                $('div.tab-content div.tab-pane[data-path="' + $location.$$path + '"]').addClass('active');
                if (_isBool) {
                    var _idTabReClick = $('div.tab > ul > li.active a').attr('data-target');
                    $(_idTabReClick + ' ul.nav-tabs li.active').removeClass('active');
                    $(_idTabReClick + ' div.tab-detail div.active').removeClass('active');
                    $(_idTabReClick + ' ul.nav-tabs li').first().addClass('active');
                    $(_idTabReClick + ' div.tab-content div.tab-pane').first().addClass('active');
                }
            }
        }

        //click vào các tab đã mở
        $('ul.nav-tabs li[data-path]').unbind('click');
        $('ul.nav-tabs li[data-path]').click(function() {
            if ($(this).hasClass('active')) {} else {
                idTabPre = $('ul.nav-tabs li.active[data-path] a').attr('data-target');
            }
            //Set Active Tab                
            var elmTabThis = $(this).attr('data-path').split('/')[2];
            if (!elmTabThis) {
                elmTabThis = $(this).attr('data-path').split('/')[1];
                var elmActive = $('.personal-menu-xs ul li[resource="' + elmTabThis + '_New_Index_Portal"]');
            } else {
                var elmActive = $('.personal-menu-xs ul li[resource="New_Personal_' + elmTabThis + '_Portal"]');
            }
            setActiveTab(elmActive);

            //load sub menu bên trái theo tab đang active, dựa vào data-path của tab để tìm menu cha của nó
            var _hash = $(this).attr('data-path').replace('/', '#');

            var liSub = $('#aside ul.menu-sidebar li a[href*="' + _hash + '"]').eq(0).parent().parent().parent().find('li').clone();

            $('#content aside ul.menu-sidebar').html(liSub);
            $('#content aside ul.menu-sidebar li a[href*="' + _hash + '"]').eq(0).addClass('active');
        });

        //xóa tab
        $('ul.nav-tabs .closed').unbind('click');
        $('ul.nav-tabs .closed').click(function() {
            var path = $(this).attr('data-path'),
                _hash;
            $('ul.nav-tabs li[data-path="' + path + '"]').remove();
            $('div.tab-content div.tab-pane[data-path="' + path + '"]').remove();
            //Xóa tab đã load được lưu trong mảng
            for (var i = 0; i < arrPath.length; i++) {
                if (arrPath[i] == path)
                    arrPath.splice(i, 1);
            }
            //đóng tab cuối cùng => về trang button
            if ($('.nav-tabs li[data-path]').length == 0) {
                window.location = '/New_Home/New_Index#';
            } else {
                if ($('.nav-tabs li[data-path]').length == 1) {
                    $('ul li[data-path]').addClass('active');
                    $('div.tab-menu div[data-path]').addClass('active');
                }
                //đóng tab đang active => về tab active trước đó
                if ($(this).parent().hasClass('active')) {
                    //Nếu tab active trước đó còn tồn tại                
                    if ($(idTabPre).length > 0) {
                        var _eleParentByTabPre = $('#list-ul-tab a[data-target=' + idTabPre + ']').parent();
                        _eleParentByTabPre.addClass('active');
                        $(idTabPre).addClass('active');
                        var urlTabPre = _eleParentByTabPre.attr('data-path');
                        if (_eleParentByTabPre.attr('data-path').indexOf('New_Personal') > 0) {
                            urlTabPre = urlTabPre + '/1';
                        }
                        var elmTabThis0 = $('#list-ul-tab li.active').attr('data-path').split('/')[2];
                        var elmActive = $('.personal-menu-xs ul li[resource="New_Personal_' + elmTabThis0 + '_Portal"]');
                        setActiveTab(elmActive);

                        _hash = urlTabPre.replace('/', '#');
                        window.location.hash = urlTabPre;
                    } else {
                        //active tab đầu tiên                        
                        $('ul li[data-path]').first().addClass('active');
                        window.location.hash = $('ul li[data-path]').first().attr('data-path') + '/1';
                        if ($('ul li[data-path]').first().attr('data-path').indexOf('New_Personal') > 0) {
                            var elmTabThis1 = $('#list-ul-tab li.active').attr('data-path').split('/')[2];
                            var elmActive = $('.personal-menu-xs ul li[resource="New_Personal_' + elmTabThis1 + '_Portal"]');
                            setActiveTab(elmActive);

                            _hash = ($('ul li[data-path]').first().attr('data-path') + '/1').replace('/', '#');
                            window.location.hash = $('ul li[data-path]').first().attr('data-path') + '/1';
                        } else {
                            var elmTabThis2 = $('#list-ul-tab li.active').attr('data-path').split('/')[2];
                            var elmActive = $('.personal-menu-xs ul li[resource="New_Personal_' + elmTabThis2 + '_Portal"]');
                            setActiveTab(elmActive);

                            _hash = $('ul li[data-path]').first().attr('data-path').replace('/', '#');
                            window.location.hash = $('ul li[data-path]').first().attr('data-path');
                        }
                    }
                }
            }

            //load sub menu bên trái theo tab đang active, dựa vào data-path của tab để tìm menu cha của nó            
            if (_hash) {
                var liSub = $('#aside ul.menu-sidebar li a[href*="' + _hash + '"]').eq(0).parent().parent().parent().find('li').clone();

                $('#content aside ul.menu-sidebar').html(liSub);
                $('#content aside ul.menu-sidebar li a[href*="' + _hash + '"]').eq(0).addClass('active');

                var _storage = localStorage.getItem('Vnr_Portal_Setting');
                if (_storage) {
                    var setting = JSON.parse(_storage);
                    if (setting.MenuLeft) {
                        $('#content aside').removeClass('hide').addClass('show');
                    }
                }
            }
        });
    }
]);

var setActiveTab = function(ele) {
    $('.menu-active-xs').removeClass('menu-active-xs');
    $(ele).addClass('menu-active-xs');
};

var isNullOrEmpty = function isNullOrEmpty(val) {
    if (val == null || val == '')
        return false;
    return true;
};

if ($('ul.menu-sidebar').find('li').hasClass('class_Personal'))
    $('.class_Personal').remove();