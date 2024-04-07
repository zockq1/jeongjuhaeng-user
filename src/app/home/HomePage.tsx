import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Keyword from '@/share/ui/keyword/Keyword';
import Menu from '@/share/ui/menu/Menu';
import Timeline from '@/share/ui/timeline/Timeline';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

export default function HomePage() {
  const { data: dateList } = useGetTimelineQuery(14);
  const a = new Array(100).fill(0).map((x, index) => {
    return index + 1 + '번 메뉴';
  });
  const b = new Array(5).fill(0).map((x, index) => {
    return index + 1 + '번 보조 메뉴';
  });

  if (!dateList) return <></>;

  return (
    <Layout>
      <Header />
      <Layout.Left>
        <Menu>
          <Menu.Group title="asd" length={b.length}>
            {b.map((menu, index) => (
              <Menu.Item key={menu} color="black" selected={index === 1}>
                {menu}
              </Menu.Item>
            ))}
          </Menu.Group>
          {a.map((menu, index) => (
            <Menu.Item key={menu} color="black" selected={index === 1}>
              {menu}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Left>
      <Layout.Main>
        <ContentBox title="고조선" subTitle="BC 2333 ~ BC 108">
          <Keyword comment="설명1.설명2">8조법</Keyword>
          <Timeline>
            {dateList.map((item, index) => {
              return <Timeline.Item dateItem={item} key={index} />;
            })}
          </Timeline>
        </ContentBox>
      </Layout.Main>
      <Layout.Right>asd</Layout.Right>
    </Layout>
  );
}
