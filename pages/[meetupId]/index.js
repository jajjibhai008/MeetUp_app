import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import React, { Fragment } from 'react';
import MeetUpDetails from '../../components/meetups/MeetUpDetails';

function ShowDetails(props) {
    return (
        <Fragment>
            <Head >
                <title>{props.meetupData.title}</title>
                <meta name='description' content='Specific meetup details'></meta>
            </Head>
            <MeetUpDetails
                image={props.meetupData.image}
                //id={props.meetupData.id}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://jajjibhai007:kamlajani007@cluster0.vaxfc.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollections = db.collection('meetups')

    const selectedMeetups = await meetupCollections.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: selectedMeetups.map(meetup => (
            {
                params: {
                    meetupId: meetup._id.toString()
                }
            }
        ))
    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://jajjibhai007:kamlajani007@cluster0.vaxfc.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollections = db.collection('meetups')

    const showMeetUp = await meetupCollections.findOne({ _id: ObjectId(meetupId), })

    client.close()
    // console.log('meetUp id'+showMeetUp._id);
    return {
        props: {
            meetupData: {
                id: showMeetUp._id.toString(),
                image: showMeetUp.image,
                title: showMeetUp.title,
                address: showMeetUp.address,
                description: showMeetUp.description,
            }
        }
    }
}

export default ShowDetails;