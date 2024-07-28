"use client"
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

type ImageResponse = {
    image: string,
    filename: string,
    classname: string,
    accuracy: string
}
type ImageResponses = {
    data: ImageResponse[],
    msg: string,
    report:string
}
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    // section: {
    //     margin: 10,
    //     padding: 10,
    //     flexGrow: 1
    // },
    mainImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:'20px'
    },
    imageContainer: {
        height: '100px',
        width: '100px',        
    }
});

// Create Document Component
const MyDocument = ({ name, age, patientId }: { name: string, age: string, patientId: string }) => { 
    const newdata = JSON.parse(window.localStorage.getItem('data')!) as any as ImageResponses
    return (
        <Document>
            <Page style={{ flexDirection: 'column', gap: '15px' }}>
                <View style={styles.mainImage}>
                    <View style={styles.imageContainer}>
                        <Image style={{ height: '100%', width: '100%' }} src={'/images/ned_logo-removebg-preview.png'} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: '10px', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <Text>Patient Name: {name}</Text>
                    <Text>Age: {age}</Text>
                    <Text>Patient ID: {patientId}</Text>
                </View>
                <View style={{flexWrap:'wrap',gap:'15px',flexDirection:'row',padding:'20px',justifyContent:'center'}}>
                    {newdata?.data.map((e: ImageResponse, index: number) =>
                        <View key={index} style={{ flexDirection: 'column', gap: '20px', alignItems: 'center', width:'150px',flexWrap:'wrap'}}>
                            <Image style={{ width: '100px', height:'100px'}} src={`data:image/jpeg;base64,${e.image}`}/>
                            <Text style={{ fontSize: '10px' }}>Accuracy: {parseInt(e.accuracy).toFixed(2)}%</Text>
                            <Text style={{fontSize:'10px'}}>ClassName: {e.classname}</Text>
                        </View>
                    )}
                </View>
                <View>
                    <Text style={{fontSize:'15px',padding:'10px'}}>
                        {newdata.report}
                    </Text>
                </View>
            </Page>
        </Document>
    )
}


export default MyDocument