[CSS] display:flex 의 overflow-y: auto 적용기 (feat. footer 고정용 리스트 만들기)

# Overview
최근 회사 내 서비스의 대규모 업데이트로 다양한 리스트를 제작하고 있었다. flex를 이용하여 레이아웃을 제작하는 과정에서 flex를 지정한 박스 내 overflow-y: auto를 하여 내부 스크롤을 만드는 경우 생기는 이슈를 발견하였고, 이슈 해결까지의 과정을 공유하고자 한다.

# 페이지의 구성
결과물을 통해 전체적인 페이지의 구성을 알아보자.
> 1. footer가 리스트에 항상 노출이 되며, 리스트의 높이에 따라 위로 붙어야되는 스팩을 갖는다.
> 2. 리스트 영역 위의 영역이 길어지면, body 영역만 가변적으로 움직이고, 헤더와 푸터의 높이는 그대로 유지가 된다.

아래의 이미지는 결과물이다. (영상길이:36s)
![](https://velog.velcdn.com/images/planic324/post/fc4a48ac-2d72-4644-94b2-bd8d484c8855/image.gif)

# Code 파악하기
## html
html 코드는 아래와 같다.
```
<div class="skill_content">
	<div class="pageTitle__box">
		<p class="pageTitle dzt_font">issue :: flex내 overflow-y</p>
	</div>
	<div class="group">
		<div class="group_title">
			<p>HOW</p>
		</div>
		<div class="group_content">
			<div class="text_wrap">
				<ul class="text_list">
					<li class="item">flex내 overflow-y의 영역 늘어나는 현상 발생</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- flex box 영역 -->
	<div class="flexBox">
		<div class="headerBox">
			<p>headerBox</p>
		</div>
		
		<div class="bodyBox">
			<ul class="bodyList">
				<li>1. 동해물과 백두산이</li>
				<li>1. 동해물과 백두산이</li>
				<li>1. 동해물과 백두산이</li>
			</ul>
		</div>
		<div class="footerBox">
			<p>footerBox</p>
		</div>
	</div>
	<!-- //flex box 영역 -->
</div>
```
위의 코드에서 `class="bodyList"`에서 `overflow-y:auto`를 적용하여 스크롤영역으로 지정한다.
## CSS

이를 적용한 css 코드는 다음과 같다.
```
<style>
.flexBox{
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    position: relative;
    background-color: green;
    .headerBox{
        display: block;
        height: 50px;
        background-color: yellow;
        min-height: 50px;
    }
    .bodyBox{
        display: block;
        flex: 1;
        .bodyList{
            display: block;
            position: relative;
            overflow-y: auto;
            height: 100%;
            padding: 15px;
            box-sizing: border-box;
            li{
                height: 30px;
                border: 1px solid #000;
                border-radius: 4px;
                padding: 0 10px;
                line-height: 30px;
                & + li{
                    margin-top: 6px;
                }
            }
        }
    }
    .footerBox{
        display: block;
        height: 50px;
        min-height: 50px;
        background-color: red;
    }
}
</style>
```
이와 같이 설정을 하면 아래의 이미지와 같이 노출이 된다.
![](https://velog.velcdn.com/images/planic324/post/3a7c707c-5937-483f-a5ba-fd748b798c2a/image.gif)


# 왜 적용이 안될까?
구글링을 해봐도 정확한 원인은 알 수 없다.
그래서 구조를 보며 개인적으로 내린 결론은 다음과 같다.

## 1. flex의 초기값의 문제.

`flex:1`은 정확히는 아래와 같다.
>flex-grow: 1; flex-shrink: 1; flex-basis: 0%;

속성에서 보듯이 `flex-basis`가 `0` 이므로 높이값이 지정이 되어 있지 않다. 그래서 내부의 리스트가 추가되면서 지정이되지 않은 높이로 인해 끝인없이 늘어나는 것이다. 따라서 `overflow:auto`를 해주지 않으면, 안되는 거라고 생각이 되었다.

## 2. flex-wrap의 기본값은 nowrap이다.

`display: flex`를 지정하면 기본적으로 `flex-wrap`은 `nowrap`으로 지정이되어 삐져나감이 발생된다. 따라서, 이 삐져나감에 대해 `flex-wrap:wrap`을 해줘서 하단으로 떨기는 경우가 있는데, 이와 같이 세로형에서는 삐져나가는 현상을 막기위해 `overflow: hidden/auto`를 해줘야 되는 것이다.

> 위의 원인은 개인적인 견해이므로, 정확한 해답을 아시는 경우 댓글로 코멘트 부탁드립니다:)


# 해결방안
> display:flex를 이용한 레이아웃을 선언한 box에 overflow-y: auto;를 적용.
> (`display:flex`, `flex`)

적용한 CSS를 확인해보자. (주석으로 추가된 부분을 표기하였습니다.)
```
<style>
.flexBox{
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    position: relative;
    background-color: green;
    /* display:flex를 선언한 곳에 overflow-y: auto를 설정 */
    overflow-y: auto;
    .headerBox{
        display: block;
        height: 50px;
        background-color: yellow;
        min-height: 50px;
    }
    .bodyBox{
        display: block;
        flex: 1;
        /* flex:1 선언한 곳에 overflow-y: auto를 설정 */
        overflow-y: auto;
        .bodyList{
            display: block;
            position: relative;
            overflow-y: auto;
            height: 100%;
            padding: 15px;
            box-sizing: border-box;
            li{
                height: 30px;
                border: 1px solid #000;
                border-radius: 4px;
                padding: 0 10px;
                line-height: 30px;
                & + li{
                    margin-top: 6px;
                }
            }
        }
    }
    .footerBox{
        display: block;
        height: 50px;
        min-height: 50px;
        background-color: red;
    }
}
</style>
```

위의 코드를 입력하면 처음 본 결과물과 동일하게 원하는 영역만 가변적으로 움직이는 레이아웃을 작업하실 수 있습니다 !

