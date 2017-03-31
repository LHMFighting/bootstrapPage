$(document).ready(function () {

    // 按下增加模态的确认按钮进行数据处理
    $(".add-success").click(function () {
        addMatch();

        $('#example').modal('hide'); // 关闭模态框
    });


    // 修改记录
    var index = 0;  //修改数组的下标
    function modifyFun() {
        $(".modify").click(function () {
            index = $(this).attr("index");
            // var $rowData = $(".rowData");
            // for (i = 0, len = $rowData.length; i < len; i++) {
            //     console.log($(this).attr("index"))
            //     console.log(i)
            //     console.log($rowData.eq(i).children().find("img").eq(0))
            //     console.log($(this))
            //     console.log($rowData.eq(i).children().find("img").eq(0) == $(this))
            //     // if($rowData.eq(i))
            // }
            var i = 0;
            // console.log($tr = $(".modal-body").eq(1).find("tr"))
            var getDataArr = []
            // console.log($(this).i)
            var $td = $(this).parent().parent().children()
            for (i = 0, len = $td.length; i < len - 1; i++) {
                switch (i) {
                    case 0:
                        getDataArr.push($td.eq(0).children().text())
                        break;
                    case 5:
                        str = $td.eq(5).text();
                        res = str.split("\n")
                        getDataArr.push(res[0])
                        getDataArr.push(res[1])
                        break;
                    default:
                        getDataArr.push($td.eq(i).text())
                        break;
                }
            }
            // console.log(getDataArr)
            var $modalTr = $(".modal-body").eq(1).find("tr")
            for (i = 0, len = $modalTr.length; i < len; i++) {
                $modalTr.eq(i).children().eq(1).children().val(getDataArr[i].trim());
            }
        });
    }
    modifyFun();

    // 确认修改记录
    $(".modify-success").click(function () {
        var $tr = $(".modal-body").eq(1).find("tr");
        // var $rowData = $(".rowData")
        // console.log($tr)
        console.log($(".rowData").eq(index).children())
        var $rowDataTd = $(".rowData").eq(index).children();
        var putDataArr = [];
        for (var i = 0, len = $tr.length; i < len; i++) {
            // console.log($tr.eq(i).children().eq(1).children().val())
            switch (i) {
                case 5:
                    var data6 = $tr.eq(i).children().eq(1).children().val()+"</br>"+"</n>"
                    break;
                case 6:
                    data6 += $tr.eq(i).children().eq(1).children().val()
                    putDataArr.push(data6);
                    break;
                default:
                    putDataArr.push($tr.eq(i).children().eq(1).children().val())
                    break;
            }
        }
        console.log(putDataArr)
        for (var i = 0, len = $tr.length; i < len - 1; i++) {
            if(i == 0){
                $rowDataTd.eq(0).children().text(putDataArr[0]) 
            } else {
                $rowDataTd.eq(i).text(putDataArr[i])
            }
        }
        $('#modifiBtn').modal('hide');
    });
    function modifySucFun (context) {

    }

    // 增加比赛记录
    function addMatch() {
        var $tr = $(".modal-body").eq(0).find("tr")
        var trHtml = '<tr class="rowData">'
        for (var i = 0, len = $tr.length; i < len; i++) {
            var trData = $tr.eq(i).children().eq(1).children().val();
            if (trData == "") {
                return;
            }
            switch (i) {
                case 0:
                    trHtml += '<td><label class="checkbox"><input type="checkbox" name="subBox">' + trData + '</label></td></td>'
                    break;
                case 5:
                    trHtml += '<td>' + trData + '</br>'
                    break;
                case 6:
                    trHtml += '\n' + trData + '</td>'
                    break;
                default:
                    trHtml += "<td>" + trData + "</td>"
                    break;
            }
            $tr.eq(i).children().eq(1).children().val("");
        }
        trHtml += '<td><img src="img/apply.png" class="modify" data-toggle="modal" href="#modifiBtn"><a class="btn" href="apply.html">开放报名</a></td>'
        trHtml += "</tr>"
        $('.span10').find("table").eq(0).find("tbody").eq(0).append(trHtml)

        modifyFun();
        // 增加记录数量
        var recordCountNum = parseInt($('.record-count').text()) + 1;
        $('.record-count').text(recordCountNum)
    }

    // 输入框筛选
    $(".searchFilter").keydown(function (e) {
        if ($(this).val() != 0 && e.keyCode == 13) {
            $(".rowData").hide().filter(":contains('" + ($(this).val()) + "')").show();
        }
        if ($(this).val() == '') {
            $(".rowData").show()
        }
    });
    $(".searchFilter").keyup(function () {
        if ($(this).val() == '') {
            $(".rowData").show()
        }
    });

    // 状态选择
    $("#state").click(function () {
        a = $("#state").val();
        b = $("#state option:checked").text();
        if ($("#state:first").val() == "全部状态") {
            $(".rowData").show()
        } else {
            $(".rowData").hide().filter(":contains('" + a + "')").show()
        }
        // console.log("被选项目的值："+a+"，被选项目的显示值："+b+"。");
    });

    // 实现全选和全不选
    $("#checkAll").click(function () {
        console.log(this.checked)
        $('input[name="subBox"]').prop("checked", this.checked);
    });

});