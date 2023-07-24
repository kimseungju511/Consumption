import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Layout,
  theme,
  Button,
  ColorPicker,
  ColorPickerProps,
  Drawer,
  Tour,
  Space,
} from 'antd';
import { SIDEBAR_ITEMS } from '../data/constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Content } from 'antd/es/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import { useAccentColor } from '../hooks/useAccentColor';

export default function MyDrawer() {
  // tour기능
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  // tour refs
  const ref0 = useRef(null); // 시작
  const ref1 = useRef(null); // 소비기록
  const ref2 = useRef(null); // 소비통계
  const ref3 = useRef(null); // 어바웃
  const ref4 = useRef(null); // 색선택
  const refs = [ref1, ref2, ref3, ref4];

  // 현재 url의 경로값을 알 수 있는 react router의 hook;
  const { pathname } = useLocation();

  // custom hook에서 가져온 강조색을 변경해주는 함수
  const { handleAccentColor } = useAccentColor();

  // 페이지 이동을 위해서 가져온 react router의 hook
  const navigate = useNavigate();

  // colorPrimary가 강조색(accentColor)입니다.
  // antD의 hook로, 전역에서 지정한 colorPrimary를 사용 할 수 있음
  const {
    token: { colorPrimary },
  } = theme.useToken();

  // Drawer가 열렸는지 닫혔는지를 useState로 저장
  const [drawerOpen, setDrawerOpen] = useState(false);

  // color picker 관련 로직
  const [colorHex, setColorHex] = useState<Color | string>(colorPrimary);
  // 투명도를 조절하는 경우
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
  // 투명도를 조절하지 않은 경우 그냥 string값을 return 하면 되고 투명도를 조절했을 경우 계산이 들어감
  const hexString = useMemo(
    () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
    [colorHex],
  );
  // 그러나 투명도를 조절한다고 해서 강조색이 바뀌지는 않음

  useEffect(() => {
    // hex값을 강조색으로 지정
    handleAccentColor(hexString);
    // 해당 hex값을 로컬저장소에 "accentColor" key값으로 저장
    localStorage.setItem('accentColor', JSON.stringify(hexString));
  }, [handleAccentColor, hexString]);

  return (
    <>
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        placement="rightTop" // 안내 표시 위치
        indicatorsRender={(current, total) => (
          <span>
            {/* 1 / 5  , 단계표시 */}
            {current + 1} / {total}
          </span>
        )}
      />
      <Layout>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}