<template>
	<div>
		<div class="line"></div>
    	<p class="text">我是有底线的</p>
	</div>
</template>

<style type="text/css">
	.no-data-text{
		color: #999;
		font-size: 13px;
		text-align: center;
	}
	.line{
		position: relative;
		z-index: 0;
		margin: 22px auto 0;
		width:66%;
		height: 1px;
		background: #d4d4d4;
		transform: scaleY(0.5);
	}
	.text{
		position: relative;
		z-index: 0;
		background: #fff;
		width:90px;
		height:22px;
		line-height:22px;
		margin: 0 auto;
		margin-top: -12px;
		font-size: 13px;
		color: #888;
	}
</style>