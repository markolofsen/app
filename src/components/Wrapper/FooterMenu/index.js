import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

import { translate } from 'react-i18next';


@translate(['home', 'common'], { wait: true })
class FooterTabsBadgeExample extends Component {

  render() {
    const { t, i18n } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button badge vertical>
            <Badge><Text>1</Text></Badge>
            <Icon name="local-taxi" />
            <Text>{t('common:Order')}</Text>
          </Button>
          <Button vertical>
            <Icon name="history" />
            <Text>{t('common:History')}</Text>
          </Button>
          <Button active vertical>
            <Icon active name="help" />
            <Text>{t('common:Support')}</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>{t('common:Account')}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterTabsBadgeExample
