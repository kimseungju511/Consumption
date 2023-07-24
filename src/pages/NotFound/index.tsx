import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="미안, 이 페이지는 존재하지 않아"
      extra={
        <Button type="primary">
          <Link to="/">뒤로 가기</Link>
        </Button>
      }
    />
  );
}