import './App.css';
import Header from './Header'
import Footer from './components/footer/'
import Navbar from './components/navbar/'
import { PageTitle } from './components/page-title/'
import { DASHBOARD_OPTIONS } from './constants/';

import { Card } from 'antd';
const { Meta } = Card;

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Navbar />
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Dashboard'}
          />
          <div className={'content-body-wrapper'}>
            {
              DASHBOARD_OPTIONS.map(option =>
                <div className={'dashboard-card'}>
                  <Card
                    hoverable
                    style={{ width: 240 }}>
                    <Meta title="Europe Street beat"
                      description="www.instagram.com"
                    />
                  </Card>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
