export default {
	data() {
		return {
		colorList: [
        "#6A91FF",
        "#2C5BE1",
        "#2C43E1",
        "#7E66FF",
        "#7B50F8",
        "#8230E2",
        "#EE7DFF",
        "#CB64D7",
        "#FF718A",
        "#E66067",
        "#FF8758",
        "#FFD567",
        "#8EE2C6",
        "#68C5CE",
      ],
      piecolorList: [
        '#6A91FF',
        '#8EE2C6',
        '#FFD567',
        '#E66067',
        '#CB64D7',
        "#68C5CE",
        "#FF718A",
        "#8230E2",
        "#7B50F8",
       
      ]
		}
	},
	methods: {
		 // 格式化ToolTip
		  formate(params, teacLiabilityStatisticType='') {
      let tip = params.data
      let str =
        `<div style="margin:-40px 0 10px;" class="echarts-wrap">
        <div style="word-break:break-all" > <span style='display:inline-block;margin-right:5px;height:5px;width:5px;background:${params.color};border-radius:50%'></span>${tip.label}</div>` +
        '<div style="margin-left:10px;color:#6E94FF;text-decoration:underline;cursor:pointer" onclick="childrenGoToRefund(\'' +
        tip.respPerson +
        "&*&" +
        teacLiabilityStatisticType +
        "')\">" +
        tip.totalCount +
        "单 " +
        (tip.precent * 100).toFixed(2) +
        "%</div>" +
        `<div style='margin-left:10px;'>${tip.totalAmount} AUD</div></div>` //上级
      if (tip.children?.length) {
        tip.children.map((v) => {
          str +=
            `<div style='font-size:14px;-webkit-transform:scale(0.8);margin-top:-10px'class="echarts-wrap"><div><span style="margin-right:5px">- ${v.label}</div>` +
            '<div style="margin-left:10px;color:#6E94FF;text-decoration:underline;cursor:pointer" onclick="childrenGoToRefund(\'' +
            v.value +
            "&*&" +
            teacLiabilityStatisticType +
            "')\">" +
            v.totalCount +
            "单 " +
            (v.precent * 100).toFixed(2) +
            "%</div>" +
            `<div style='margin-left:10px;'>${v.totalAmount} AUD</div></div>`
        })
      }
      return str
    },
	}
}