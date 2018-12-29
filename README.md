# bangumi_datavis
Data visualization of bangumi.tv.
Assignment for coarse "Data Visualization and Data Analyse"

### Requirements
* Python 3.7.0
* Chrome 71.0.3578.98

### Intro
* Screenshot:
<img src="/gallary/screenshot.png" />

* Left bottom: 
图控制台，可以调整图显示的各种参数，例如调整“连通度阈值”可以调整要显示的边个数，调整“选择显示顶点”可以选择要显示子图的番剧集合。调整“线显示模式”可以切换要选择显示单个顶点的连通域或者显示由一些顶点集合间连通关系构成的子图。

* Middle:
层次边束化图，节点表示一个番剧，边表示两个番剧间相似度大于一定阈值。节点颜色表示番剧的评分，边的颜色和粗细表示相连两番剧间相似度大小。鼠标悬浮在一个节点上时可以显示该番剧的标题。单击该节点可以显示该番剧的具体信息，当线显示模式为连通域时还可以红色高亮与该节点相连的所有边。

* Right top:
搜索框，可以按关键字搜索番剧节点。

* Right bottom:
番剧具体信息，当通过单击节点等方式选中某番剧时，会在此显示该番剧的具体信息。其中声优、制作公司、编剧等信息可以单击，单击时会在图中高亮显示由包含该信息的节点构成的子图。例如：单击“茅野爱衣”可以在图中显示所有茅野爱衣作为声优出演过的番剧节点构成的子图。

* Right:
番剧推荐栏。用户在上方输入感兴趣的番剧或者看过的番剧。中间栏可以根据用户选择番剧实时更新推荐指标的权重，也可以由用户手动输入。当单击下方输出按钮时会在下方栏中显示为用户推荐的番剧列表。
