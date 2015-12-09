/** @flow */
import { contacts, filteredContactIds } from '../../resources'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { FlexColumn, FlexTable } from 'react-virtualized'
import styles from './ContactTable.css'
import React from 'react'

export function ContactTable ({ contacts, filteredContactIds }) {
  return (
    <div className={styles.ContactTable}>
      <FlexTable
        className={styles.FlexTable}
        rowClassName={styles.FlexTableRow}
        width={700}
        height={200}
        headerHeight={30}
        rowHeight={30}
        rowsCount={filteredContactIds ? filteredContactIds.size : 0}
        rowGetter={index => contacts.get(filteredContactIds.get(index))}
      >
        <FlexColumn
          label='Address'
          dataKey='address'
          width={100}
        />
        <FlexColumn
          label='Phone'
          dataKey='phone'
          width={100}
        />
        <FlexColumn
          label='Email'
          dataKey='email'
          width={150}
        />
        <FlexColumn
          label='Title'
          dataKey='title'
          width={200}
          flexGrow={1}
        />
        <FlexColumn
          width={150}
          label='Name'
          dataKey='name'
        />
      </FlexTable>
      {contacts.size === 0 &&
        <div className={styles.NoContactsMessage}>
          No contacts have been loaded
        </div>
      }
    </div>
  )
}

const selectors = createSelector(
  [contacts, filteredContactIds],
  (contacts, filteredContactIds) => ({
    contacts,
    filteredContactIds
  })
)

export default connect(selectors)(ContactTable)