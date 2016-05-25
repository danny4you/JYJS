/*! jy.js 1.0
 * ©2015-2016 jiayougo.com
 * date: 2016-4-18
 */

/**
 * @summary     jyjs
 * @description 家有购物集团 js插件
 * @version     1.0
 * @file        jyjs jycss fonts
 * @author      家有购物集团软件部
 * @contact     www.jiayougo.com
 * @copyright   Copyright 2015-2016 jiayougo.com 家有购物版权所有
 */
(function (factory) {
	"use strict";
	if ( typeof define === 'function' && define.amd ) {
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}
			if ( ! $ ) {
				$ = typeof window !== 'undefined' ?
					require('jquery') :
					require('jquery')( root );
			}
			return factory( $, root, root.document );
		};
	}
	else { 
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
	//==js通用方法扩展
	Math.randomString = function(n) {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for (var i = 0; i < n; i++)
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};
	
	String.prototype.getCss = function(){
	    var css = {};
	    var style = this.valueOf().split(';');
	    for (var i = 0; i < style.length; i++) {
	        style[i] = $.trim(style[i]);
	        if (style[i]) {
	            var s = style[i].split(':');
	            css[$.trim(s[0])] = $.trim(s[1]);
	        }
	    }
	    return css;
	};
	
	String.prototype.trim = function(){
	    return this.replace(/^\s+|\s+$/g, "");
	};
	
	String.prototype.toDate = function() {
        var dt = new Date(),
            dot = this.replace(/\d/g, '').charAt(0),
            arr = this.split(dot);

        dt.setFullYear(arr[0]);
        dt.setMonth(arr[1] - 1);
        dt.setDate(arr[2]);
        return dt;
    };

    Date.prototype.format = function(exp) {
        var y = this.getFullYear(),
            m = this.getMonth() + 1,
            d = this.getDate();

        return exp.replace('yyyy', y).replace('mm', m).replace('dd', d);
    };
    
	Number.prototype.isBetween = function(num1, num2, including){
	    if ( ! including){
	        if (this.valueOf() < num2 && this.valueOf() > num1) {
	            return true;
	        }
	    }else{
	        if (this.valueOf() <= num2 && this.valueOf() >= num1) {
	            return true;
	        }
	    }
	    return false;
	};
	
	$.fn.disableSelection = function() {
	    return this
	             .attr('unselectable', 'on')
	             .css('user-select', 'none')
	             .on('selectstart', false);
	};

	$.fn.enableSelection = function() {
	    return this
	             .removeAttr('unselectable')
	             .css('user-select', 'initial')
	             .off('selectstart');
	};
	
	//==变量,默认属性初始化
	var danny = {},
		util = {},
		component = {},
		_cookie = {},
		expand = {};
	
	var	default_fcolor = '#87CEEB',
		default_bcolor = '#EEEEEE';
	
	//==内部方法
	var init = function(){
		$.extend(danny,util,component,_cookie,expand);
	};
	var basePath = function(){
		var local = window.location;  
		var contextPath = local.pathname.split("/")[1];  
		var basePath = local.protocol+"//"+local.host+"/"+contextPath+"/"; 
		return basePath;
	};
	var contains=function(arr,param){
		  for (var i = 0; i < arr.length; i++) {
	            if (arr[i] == param) {
	                return true;
	            }
	        }
	        return false;
	};
	var unique=function(arr,data,param){
		var n = 0;
		for(var i = 0; i < data.length; i++){
			 if(!contains(arr,data[i][param])){
     			  arr[n] = data[i][param];
     			  n = n+1;
		  	 }
		}
	};
	
	//==公开方法
	util = {
		basePath:basePath(),
		/**
		 *  快排
		 * @param array,desc_yn,param (arr,boolean,string)
		 * 		  1.两个参数 数组排序  array,desc_yn
		 *        2.三个参数 对象排序  array,desc_yn,param
		 *        3.desc_yn:ture降序  false  升序
		 * @example
		 * 		a = [2,6,1];
		 * 		jy.quickSort(a,true);
		 * 		b = [{x=2},{x=9},{x=6}];
		 * 		jy.quickSort(b,false,'x');
		 */
		quickSort : function(array,desc_yn,param){
			if(param===undefined){
				function quicksort(arr,low,high){
					var pivot;
					if(low < high){
						pivot = partition(arr,low,high,desc_yn);
						quicksort(arr,low,pivot-1);
						quicksort(arr,pivot+1,high);
					}
					return arr;
				}	
				function partition(arr,low,high,desc_yn){
					var pivot = arr[low];
					while(low <= high){
						if(desc_yn){
							while(low <= high && arr[high] >= pivot){
								high--;
							}
							swap(arr,low,high);
							while(low <= high && arr[low] < pivot){
								low++;
							}
							swap(arr,low,high);
						}else{
							while(low <= high && arr[high] <= pivot){
								high--;
							}
							swap(arr,low,high);
							while(low <= high && arr[low]> pivot){
								low++;
							}
							swap(arr,low,high);
						}
					}
					
					return low;
				}
				quicksort(array,0,array.length-1);
				return array;
			}else{
				function quicksort(arr,low,high,param){
					var pivot;
					if(low < high){
						pivot = partition(arr,low,high,param,desc_yn);
						quicksort(arr,low,pivot-1,param);
						quicksort(arr,pivot+1,high,param);
					}
					
					return arr;
				}	
				function partition(arr,low,high,param,desc_yn){
					var pivot = arr[low][param];
					while(low <= high){
						if(desc_yn){
							while(low <= high && arr[high][param] >= pivot){
								high--;
							}
							swap(arr,low,high);
							while(low <= high && arr[low][param] < pivot){
								low++;
							}
							swap(arr,low,high);
						}else{
							while(low <= high && arr[high][param] <= pivot){
								high--;
							}
							swap(arr,low,high);
							while(low <= high && arr[low][param] > pivot){
								low++;
							}
							swap(arr,low,high);
						}
					}
					
					return low;
				}
				quicksort(array,0,array.length-1,param);
				return array;
			}
			function swap(arr,low,high){
				var temp;
				temp = arr[low];
				arr[low] = arr[high];
				arr[high] = temp;
			}
		},
		/**
		 *  ajax 请求(post形式,传递参数类型为string)
		 * @param   params json对象
		 * @example
	  		danny.load({
					url:'getData.do',
					param:"begin_date="+$('#pdate').val(),
					callback:function(){
						alert(this);
					}
			});
		 * 		
		 */
		load : function(params){
			$.ajax({ 
		          type : 'POST',  
		          url : basePath()+params.url,  
		          data: params.param,
		          async:params.async===false?false:true,
		          dataType : 'json',  
		          success : function(data) {
		        	  if(params.callback)
		        	  params.callback.call(data,this);
		          },                                                                        
		          error : function(data) {
		        	  if(params.error)
		        		  alert(params.error);
		        	  else
		        		  alert("加载失败");
		          }  
		    });  
		},
		/**
		 * js获取页面传递的参数值
		 * var id= jy.request('id'); 
		 */
		request:function(strParame){
			var args = new Object( ); 
			var query = location.search.substring(1); 

			var pairs = query.split("&");
			for(var i = 0; i < pairs.length; i++) { 
			var pos = pairs[i].indexOf('='); 
			if (pos == -1) continue; 
			var argname = pairs[i].substring(0,pos); 
			var value = pairs[i].substring(pos+1); 
			value = decodeURIComponent(value); 
			args[argname] = value; 
			} 
			return args[strParame]; 
		},
		/**
		 * 分页 ajax 模式
		 * 在页面中加入
		 * <div class="page">
		 *		<div id="kkpager" align="center"></div>
		 * </div>
		 */
		page:function(totalPage_,totalRow_,nowPage_,callback){
			var totalPage = totalPage_;
			var totalRecords = totalRow_;
			var pno = nowPage_;
			if(pno == null || pno == undefined || pno == ''){
				pno =0;
			}
			if(totalRecords == null || totalRecords == undefined || totalRecords == ''){
				totalRecords =0;
			}
			if(totalPage == null || totalPage == undefined || totalPage == ''){
				totalPage =0;
			}
			//生成分页
			kkpager.generPageHtml({
				mode : 'click',
				click :function(n){
					this.selectPage(n);
					callback(n);
				},
				pno : pno,
				//总页码
				total : totalPage,
				//总数据条数
				totalRecords : totalRecords,
				//链接前部
				hrefFormer : '<%=basePath%>',
				//链接尾部
				hrefLatter : '.do',
				getLink : function(n){
					return this.hrefFormer + this.hrefLatter + "?pno="+n;
				}
			},true);
			
			//显示总记录条数
			//$('.totalText').after("<span>  共"+totalRecords+"条记录 </span>");
		},
	};
	component = {
		knob : function(id,opt){
			var setting = $.extend({
				value:0,
				max: 100,
				min: 0,
				thickness: 0.1,
				fgColor: default_fcolor,
				bgColor: default_bcolor,
				'release':function(e){
					
				}	
			},opt);
			$("#"+id).append('<input id="knob-'+id+'" value="'+setting.value+'"/>');
			$("#knob-"+id).knob(setting);
		},
		slider : function(id,opt){
			var setting = $.extend({
				id: "",
				value: 5,
			  	min: 0,
				max: 10,
				step: 1,
				fgColor: default_fcolor,
				bgColor: default_bcolor,
				formatter: function(val) {
					return val;
				},
			},opt);
			
			$("#"+id).append('<input id="slider-'+id+'"/>');
			$("#slider-"+id).slider(setting);
			$('#'+id+ ' .slider-handle').css('background',setting.fgColor);
			$('#'+id+ ' .slider-selection').css('background',setting.bgColor);
		},
		calendar : function(id,opt){
			var setting = $.extend({
				trigger: '#'+id,
				zIndex: 999,
				format: 'yyyy/mm/dd',
				onSelected: function (view, date, data) {
					
				},
				onClose: function (view, date, data) {
					
				}
			},opt);
			$('#'+id+'-c').calendar(setting);
		},
		panel : function(id,opt){
			var setting = $.extend({
			    reload: false,
                close: false,
                editTitle: false
			},opt);
			$('#'+id).lobiPanel(setting);
		},
		table:function(id,opt){
			var setting = $.extend({
				 autoWidth: true,
				 language: {
				        "sProcessing": "处理中...",
				        "sLengthMenu": "显示 _MENU_ 项结果",
				        "sZeroRecords": "没有匹配结果",
				        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
				        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
				        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
				        "sInfoPostFix": "",
				        "sSearch": "搜索:",
				        "sUrl": "",
				        "sEmptyTable": "表中数据为空",
				        "sLoadingRecords": "载入中...",
				        "sInfoThousands": ",",
				        "oPaginate": {
				            "sFirst": "首页",
				            "sPrevious": "上页",
				            "sNext": "下页",
				            "sLast": "末页",
				        },
				        "oAria": {
				            "sSortAscending": ": 以升序排列此列",
				            "sSortDescending": ": 以降序排列此列",
				        }
				    }
			},opt);
			$('#'+id).DataTable(setting);
		},
		addLoading : function(opt){
			var setting = $.extend({
				timeToHide:1000000,
				fgColor:'#ffffff',
				bgColor:"rgba(0,0,0,0.7)",//幕布颜色 修改圆圈颜色 修改 .container1 div 样式(fakeLoader.css)
				spinner:"spinner2"	
			},opt);
			$('body').append('<div class="fakeloader"></div>');
			$(".fakeloader").fakeLoader(setting);
			$('.container1 div').css('background-color',setting.fgColor);
			$('.container2 div').css('background-color',setting.fgColor);
			$('.container3 div').css('background-color',setting.fgColor);
		},
		removeLoading : function(){
			$('.fakeloader').remove();
		},
	};
	_cookie = {
		setCookie:function(name,value,time){
		    var strsec = _cookie.setDeadline(time); 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() + strsec*1); 
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
		},
		getCookie:function(name){
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		    if(arr=document.cookie.match(reg))
		        return unescape(arr[2]); 
		    else 
		        return null; 
		},
		delCookie:function(name){
			var exp = new Date(); 
		    exp.setTime(exp.getTime() - 1); 
		    var cval=getCookie(name); 
		    if(cval!=null) 
		    document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
		},
		setDeadline:function(str){
		   var str1=str.substring(1,str.length)*1; 
		   var str2=str.substring(0,1); 
		   if	   (str2=="s"){ return str1*1000;}
		   else if (str2=="h"){ return str1*60*60*1000; }
		   else if (str2=="d"){ return str1*24*60*60*1000; } 
		},
	};
	//===对外扩展方法(请删除)
	expand = {
		getCity:function(){
			var city = {};
			util.load({
				url:'background/good/getCity.do',
				async:false,
				callback:function(){
					city = this;
				}
			});
			return city;
		},
		getLclss:function(){
			var clss = {};
			util.load({
				async:false,
				url:'background/good/getLclss.do',
				callback:function(){
					clss = this;
				}
			});
			return clss;
		},
		getMclss:function(lId){
			var clss = {};
			util.load({
				async:false,
				url:'background/good/getMclss.do',
				param:"lId="+lId,
				callback:function(){
					clss = this;
				}
			});
			return clss;
		},
		getSclss:function(lId,mId){
			var clss = {};
			util.load({
				async:false,
				url:'background/good/getSclss.do',
				param:"lId="+lId+"&mId="+mId,
				callback:function(){
					clss = this;
				}
			});
			return clss;
		},
		
	};
	//==初始化 开放指定方法接口
	init();
	window.danny = window.jy = danny;
	
	
	
	//==过时方法 不在使用
	/**
	 *  @deprecated 冒泡排序 
	 */
	bubbleSort = function(arr_,param,desc_yn){
		var arr = arr_;
		var temp;
		if(desc_yn){
			for(var i=0;i<arr.length-1;i++){
				for(var j=0;j<arr.length-1-i;j++){
					if(arr[j][param]<arr[j+1][param]){
						temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
					}
					
				}
			}
		}else{
			for(var i=0;i<arr.length-1;i++){
				for(var j=0;j<arr.length-1-i;j++){
					if(arr[j][param]>arr[j+1][param]){
						temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
					}
					
				}
			}
		}
		return arr;
	};
}));
/**
 * 对外开放方法汇总 v1.2
    一 通用方法
 	  basePath   	  获取项目根路径(属性)
 	  quickSort 	  对数组/对象排序
 	  load      	  ajax请求
 	  request         获取传递的参数
 	  page            分页
    二 组件
 	  knob        	  环形
 	  slider      	  滑块
 	  calendar    	  日期
 	  panel      	  面板
 	  table      	  表格
 	  addLoading 	  添加加载幕布
 	  removeLoading   删除幕布
 	三 其他
 	  cookie操作
 	  	setCookie     设置cookie
 	  	getCookie     获取cookie
 	  	delCookie	  删除cookie
 	  	
 	四 扩展方法(请删除)
 	  getCity
 	  getLclss
 	  getMclss
 	  getSclss
 */
