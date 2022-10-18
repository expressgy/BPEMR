import Button from "../../components/Button";

export default function App() {
    return (
        <div style={{padding: "2em 4em"}}>
            <h1>Button组件</h1>

            <h2>大小</h2>
            <Button size={'undersize'}>点击我</Button>
            <Button>点击我</Button>
            <Button size={'oversize'}>点击我</Button>
            <h2>颜色</h2>
            <h3>错误</h3>
            <Button type={'error'} size={'oversize'}>点击我</Button>
            <Button type={'error2'} size={'oversize'}>点击我</Button>
            <Button type={'error3'} size={'oversize'}>点击我</Button>
            <h3>成功</h3>
            <Button type={'success'}>1点击我</Button>
            <Button type={'success2'}>2点击我</Button>
            <Button type={'success3'}>7点击我</Button>
            <h3>警告</h3>
            <Button type={'warning'}>点击我</Button>
            <Button type={'warning1'}>点击我1</Button>
            <Button type={'warning3'}>点击我3</Button>

                <h2>事务</h2>
                <h3>正常</h3>
                <Button onClick={() => {console.log('xs')}}>点击我3</Button>
                <h3>失效</h3>
                <Button disable onClick={() => {console.log('xs')}}>点击我3</Button>
                <h3>加载</h3>
                <Button type={'success'}>放大缩小，抖动</Button>

        </div>
    )
}