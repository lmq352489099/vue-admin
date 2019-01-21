<template>
    <div class="view-container">
        <h2 class="view-title">咨询量</h2>
        <div class="container-main">
            <div class="title-time">
                <DatePicker
                    :open="open"
                    type="daterange"
                    placement='bottom-end'
                    :value='timeBox'
                    @on-change="setTime">
                    <ButtonGroup>
                        <Button :type="changeTimeIndex === 1 ? 'primary' : 'ghost'" @click='changeTime(1)'>昨天</Button>
                        <Button :type="changeTimeIndex === 2 ? 'primary' : 'ghost'" @click='changeTime(2)'>一周</Button>
                        <Button :type="changeTimeIndex === 3 ? 'primary' : 'ghost'" @click='changeTime(3)'>一个月</Button>
                        <Button type="ghost" @click='changeTime(4)'>{{showTime}}</Button>
                    </ButtonGroup>
                </DatePicker>
            </div>
            <div class='chart-container'>
                <div class="chart" id="consultChart"></div>
            </div>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data () {
        return {
            tableLoad: false,
            changeTimeIndex: 2,
            open: false,
            chart: null,
            timeBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            data: [],
            col: [
                {
                    title: '时间段',
                    key: 'time'
                },
                {
                    title: '顾客咨询人数',
                    key: 'user'
                },
                {
                    title: '医生回复量',
                    key: 'doctor'
                }
            ]
        }
    },
    computed: {
        showTime () {
            this.getCharts()
            return `${this.timeBox[0]} 至 ${this.timeBox[1]}`
        },
    },
    mounted () {
        let _vm = this
        _vm.initChart()
        window.addEventListener('resize', _vm.init)
    },
    beforeDestroy () {
        let _vm = this
        window.removeEventListener('resize', _vm.init)
        _vm.chart.dispose()
        _vm.chart = null
    },
    methods: {
        getCharts () {
            let _vm = this,
                _data = {}
            if(_vm.changeTimeIndex !== 1) {
                _data = {
                    startTime: _vm.timeBox[0],
                    endTime: _vm.timeBox[1]
                }
            }
            _vm.tableLoad = true
            _vm.$http.get({
                url: 'doct-webManager/charts/consult_charts.jhtml',
                data: _data,
                success: function(res){
                    if(res.code === 0 ){
                        const _xData = res.content.xAxis || []
                        const _user = res.content.user || []
                        const _doc = res.content.staff || []
                        _vm.chart.setOption({
                            xAxis: {
                                data: _xData
                            },
                            series: [
                                {
                                    name: '顾客咨询人数',
                                    data: _user
                                },
                                {
                                    name: '医生回复量',
                                    data: _doc
                                }
                            ] 
                        })
                        _vm.data = _xData.map((item, index) => {
                            return {
                                time: item,
                                user: _user[index],
                                doctor: _doc[index]
                            }
                        })
                        _vm.tableLoad = false
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        initChart () {
            let _vm = this
            _vm.chart = echarts.init(document.getElementById('consultChart'))
            _vm.chart.setOption({
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 30,
                    textStyle: {
                        fontSize: 13,
                    },
                    data: ['顾客咨询人数','医生回复量']
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '20px',
                    right: '35px',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '顾客咨询人数',
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: '#5cadff',
                                opacity: 0.2
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#5cadff',
                                shadowBlur: 40,
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#5cadff',
                                    }
                                }
                            }
                        },
                        data: []
                    },
                    {
                        name: '医生回复量',
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: '#19be6b',
                                opacity: 0.2
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#19be6b',
                                shadowBlur: 40,
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#19be6b',
                                    }
                                }
                            }
                        },
                        data: []
                    }
                ]
            })
        },
        init () {
            if(this.chart) {
                console.log(1234565)
                this.chart.resize()
            }
        },
        changeTime (val) {
            this.changeTimeIndex = val
            if(val === 1) {
                this.setTime([moment().subtract(1, 'd').format('YYYY-MM-DD'), moment().subtract(1, 'd').format('YYYY-MM-DD')])
            } else if(val === 2) {
                this.setTime([moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
            } else if(val === 3) {
                this.setTime([moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
            } else if(val === 4) {
                this.open = !this.open
            }
        },
        setTime (val) {
            console.log(2222222)
            this.timeBox.splice(0, 2, ...val)
            this.open = false
        }
    }
}
</script>

<style scoped>
    .chart-container{
        position: relative;
        width: 100%;
        height: 350px;
        margin-bottom: 30px;
    }
    .chart {
        width: 100%;
        height: 100%;
    }
    .title-time {
        margin-bottom: 16px;
        text-align: right;
    }
</style>
