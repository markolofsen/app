import React from 'react'
import PropTypes from 'prop-types' // 15.6.0
import { View, ActivityIndicator, Text } from 'react-native'


import styles from "./styles";


class Footer extends React.Component {
  static propTypes = {
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    hasMore: false,
    isLoading: false,
  }


  render() {
    const { isLoading } = this.props
    const title = isLoading ? 'Loading more...' : '— END —'

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator style={{ opacity: isLoading ? 1 : 0 }} animating={true} />
        <Text style={styles.footerRitle}>
          {title}
        </Text>
      </View>
    )
  }
}


export default Footer
