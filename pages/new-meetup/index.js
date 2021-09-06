import React, { Fragment } from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function index(props) {
    async function onAddMeetUpHandler(Data) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = response.json()
        
    }
    return (
        <Fragment>
        <Head >
                <title>Add New Meetup</title>
                <meta name='description' content='Add new meetup According to your choice'></meta>
            </Head>
        <NewMeetupForm onAddMeetup={onAddMeetUpHandler} />
        </Fragment>
    );
}

export default index;