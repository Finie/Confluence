/* eslint-disable react-native/no-inline-styles */

/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React from 'react'
import { View } from 'react-native'

export function VerticalMapList({
  data,
  renderItem,
  ListHeaderComponent,
  ListHeaderComponentStyle,
  ListFooterComponent,
  ListFooterComponentStyle,
  ListEmptyComponent,
  style,
  horizontal,
  ItemSeparatorComponent,
  numColumns,
}) {
  const createGroup = () => {
    const dataGroup: any[][] = []
    let groupCount = 0
    let group: any[] = []

    data.map((item: any, index: number) => {
      if (groupCount === 0 && index !== 0) {
        dataGroup.push(group)
        group = []
      }
      group.push(item)
      groupCount++
      if (groupCount === numColumns) {
        groupCount = 0
      }
      if (data.length - 1 === index) {
        dataGroup.push(group)
      }
    })
    return dataGroup
  }

  return (
    <View style={style}>
      <View style={ListHeaderComponentStyle}>
        {ListHeaderComponent && ListHeaderComponent}
      </View>
      {(!data || data.length === 0) && ListEmptyComponent && ListEmptyComponent}
      {((numColumns && numColumns === 1) || !numColumns) && (
        <View style={{ flexDirection: horizontal ? 'row' : 'column' }}>
          {data &&
            data.map((item: any, index: number) => (
              <View key={String(index)}>
                <View>{renderItem && renderItem({ item, index })}</View>
                {data.length - 1 !== index && ItemSeparatorComponent}
              </View>
            ))}
        </View>
      )}
      {numColumns && numColumns !== 1 && (
        <View>
          {createGroup() &&
            createGroup().map((item, index) => (
              <View key={String(index)} style={{ flexDirection: 'row' }}>
                {item.map((item2: any, index2: any) => (
                  <View key={String(index2)} style={{}}>
                    <View style={{ flex: 1 }}>
                      {renderItem && renderItem({ item: item2, index: index2 })}
                    </View>
                    {data.length - 1 !== index && ItemSeparatorComponent}
                  </View>
                ))}
              </View>
            ))}
        </View>
      )}

      <View style={ListFooterComponentStyle}>
        {ListFooterComponent && ListFooterComponent}
      </View>
    </View>
  )
}
