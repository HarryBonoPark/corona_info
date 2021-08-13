$(function(){
    $.ajax({
        type:"get",
        url:"/api/corona/age/today",
        success:function(r) {
            console.log("연령대 별 코로나 현황")
            console.log(r);

            let confArr = new Array();
            let confLabel = new Array();
            for(let i=0; i<r.data.length; i++) {
                confArr.push(r.data[i].confCase);
                confLabel.push(r.data[i].gubun+"대");
            }
            let ageChart = new Chart($("#age_chart"), {
                type:"bar",
                options:{
                    responsive:false,
                },
                data:{
                    labels:confLabel,
                    datasets:[
                        {
                            label:r.dt+" 연령대 별 확진",
                            data:confArr,
                            backgroundColor:["rgba(255, 0, 0, 0.4)"]
                        }
                    ]
                }
            })
        }
    })

    $.ajax({
        type:"get",
        url:"/api/corona/gen/today",
        success:function(r) {
            console.log(r);
            let confArr = new Array();
            let confLabel = new Array();
            for(let i=0; i<r.data.length; i++) {
                confArr.push(r.data[i].confCase);
                confLabel.push(r.data[i].gubun);
            }
            let genChart = new Chart($("#gen_chart"), {
                type:"pie",
                options:{
                    responsive:false,
                },
                data:{
                    labels:confLabel,
                    datasets:[
                        {
                            label:r.dt+"성별 확진 비율",
                            data:confArr,
                            backgroundColor:["rgba(255, 0, 0, 0.4)", "rgba(0,0,255,0.4)"]
                        }
                    ]
                }
            })
        }
    })

    $.ajax({
        type:"get",
        url:"/api/coronaInfo/today",
        success:function(r) {
            console.log(r);
            $("#accExamCnt").html(r.data.strAccExamCnt);
            $("#decideCnt").html(r.data.strDecideCnt);
            let ctx2 = $("#confirmed_chart");
            let confirmed_chart = new Chart(ctx2, {
                type:"pie",
                options:{
                    responsive:false
                },
                data:{
                    labels:["확진", "음성"],
                    datasets:[
                        {
                            label:"확진/음성",
                            data:[r.data.decideCnt, r.data.examCnt-r.data.decideCnt],
                            backgroundColor:["#87CE00", "#FFE400"]
                        }
                    ]
                }
            })
        }
    })

    $.ajax({
        type:"get",
        url:"api/coronaSidoInfo/today",
        success:function(r) {
            console.log(r);
            let sidoName = new Array();
            let defCnt = new Array();

            for(let i=0; i<6; i++) {
                let tag = "<tbody class='region-tbody'></tbody>";
                $(".region_confirm_tbl").append(tag);
            }

            for(let i=0; i<r.data.length; i++) {
                let sido = r.data[i].gubun;
                let cnt = r.data[i].incDec;
                sidoName.push(sido);
                defCnt.push(cnt);

                // 012 / 3 = 0.xxxx
                // 345 / 3 = 1.xxxx
                // 678 / 3 = 2.xxxx
                console.log(Math.floor(i/3));
                let page = Math.floor(i/3);
                let tag = 
                '<tr>'+
                    '<td>'+r.data[i].gubun+'</td>'+
                    '<td>'+r.data[i].defCnt+'</td>'+
                    '<td>'+r.data[i].incDec+' ▲</td>'+
                '</tr>'
                $(".region-tbody").eq(page).append(tag);
            }
            $(".region-tbody").eq(0).addClass("active");

            $("#region_next").click(function(){
                let currentPage = Number($(".current").html()); // 숫자형태로 바꿔주기
                currentPage++;
                if(currentPage > 6) currentPage = 6;
                $(".current").html(currentPage);
                $(".region-tbody").removeClass("active");
                $(".region-tbody").eq(currentPage-1).addClass("active");
            })
            $("#region_prev").click(function(){
                let currentPage = Number($(".current").html());
                currentPage--;
                if(currentPage < 1) currentPage = 1;
                $(".current").html(currentPage);
                $(".region-tbody").removeClass("active");
                $(".region-tbody").eq(currentPage-1).addClass("active");
            })

            let ctx = $("#regional_status");
            let regionalChart = new Chart(ctx, {
                type:'bar',
                options:{
                    responsive:false
                },
                data:{
                    labels:sidoName,
                    datasets:[{
                        label:r.dt+" 신규확진",
                        data:defCnt,
                        backgroundColor:['#FF9900']
                    }]
                }
            })
        }
    })

    $.ajax({
        type:"get",
        url:"api/corona/vaccine/today",
        success:function(r) {
            console.log("접종 현황")
            console.log(r);

            let regionArr = new Array();
            let firstArr = new Array();
            let secondArr = new Array();
            
            for(let i=0; i<r.data.length; i++) {
                regionArr.push(r.data[i].region);
                firstArr.push(r.data[i].firstCnt);
                secondArr.push(r.data[i].secondCnt);
            }
            let vaccineChart = new Chart($("#vaccine_chart"), {
                type:'bar',
                options:{
                    responsive:false
                },
                data:{
                    labels:regionArr,
                    datasets:[{
                        label:"1차 접종현황",
                        data:firstArr,
                        backgroundColor:['#99CCFF']
                    },
                    {
                        label:"2차 접종현황",
                        data:secondArr,
                        backgroundColor:['rgb(30, 30, 255, 0.7)']
                    }]
                }  
            })
        }
    })
})
