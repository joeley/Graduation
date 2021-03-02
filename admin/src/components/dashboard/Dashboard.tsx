/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline } from 'antd';
import BreadcrumbCustom from '../widget/BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import {
  CameraOutlined,
  CloudOutlined,
  HeartOutlined,
  MailOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { getAxios } from '../../service';
import { Notify } from '../widget';

class Dashboard extends React.Component<{}, {
  allCount: string,
  payedCount: string,
  turnover: string,
  establish: string
}> {
  componentDidMount() {
    const promiseArr: any[] = [];
    const apiArr = ["allcount", "payedcount", "turnover", "establish"]

    for (const api of apiArr) {
      promiseArr.push(
        getAxios({
          api: "/dashboard/" + api
        })
      )
    }
    const pro = Promise.all(promiseArr)
    pro.then((ele) => {
      this.setState({
        allCount: ele[0],
        payedCount: ele[1],
        turnover: ele[2],
        establish: ele[3]
      })
    })
    pro.catch(() => {
      Notify("warning", "初始化失败", "初始化数据失败，请检查网络")
    })

  }
  render() {
    return (
      <div className="gutter-example button-demo">
        <BreadcrumbCustom />
        <Row gutter={10}>
          <Col className="gutter-row" md={4}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <HeartOutlined className="text-2x text-danger" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">订单量</div>
                    <h2>{this.state?.allCount||"XXX"}</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <CloudOutlined type="cloud" className="text-2x" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">成交额</div>
                    <h2>{this.state?.turnover||"XXX"}</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={4}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <CameraOutlined className="text-2x text-info" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">成交量</div>
                    <h2>{this.state?.payedCount||"XXX"}</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <MailOutlined className="text-2x text-success" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">运行天数</div>
                    <h2>{this.state?.establish||"XXX"}</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={16}>
            <div className="gutter-box">
              <Card bordered={false} className={'no-padding'}>
                <EchartsProjects />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>任务</h3>
                  <small>10个已经完成，2个待完成，1个正在进行中</small>
                </div>
                <span className="card-tool">
                  <SyncOutlined />
                </span>
                <Timeline>
                  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>联调接口</p>
                    <p>功能验收</p>
                  </Timeline.Item>

                  <Timeline.Item color="#108ee9">
                    <p>登录功能设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>消息栏</h3>
                </div>
                <span className="card-tool">
                  <SyncOutlined />
                </span>
                <ul className="list-group no-border">
                  <li className="list-group-item">
                    <span className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </span>
                    <div className="clear">
                      <span className="block">路飞</span>
                      <span className="text-muted">管理后台的数据不用乱搞！</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </span>
                    <div className="clear">
                      <span className="block">索隆</span>
                      <span className="text-muted">图片别传太大的，服务器内存小~~</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </span>
                    <div className="clear">
                      <span className="block">娜美</span>
                      <span className="text-muted">图片去小米官网去扒！！</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </span>
                    <div className="clear">
                      <span className="block">乌索普</span>
                      <span className="text-muted">
                        有bug联系我，反正我也不改···
                                            </span>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>访问量统计</h3>
                  <small>最近7天用户访问量</small>
                </div>
                <span className="card-tool">
                  <SyncOutlined type="sync" />
                </span>
                <EchartsViews />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
