import styles from './components.module.css'

export default async function CustomerInfo({user}) {
    return (
        <div className={styles.customer_details_container}>
            <h1>Customer&apos;s Details</h1>
            <div className={styles.cards_details_container}>
                <div className={styles.cards_details}>
                    <h3>Personal details</h3>
                    <p><span>#ID: </span>{user.id}</p>
                    <p><span>Name: </span>{`${user.first_name} ${user.last_name}`}</p>
                    <p><span>Email: </span>{user.email}</p>
                </div>
                <div className={styles.cards_details}>
                    <h3>Contact Information</h3>
                    { user && user.phones ? (
                        <ul>
                            { user.phones.map((phone) =>{
                                return (
                                    <li key={phone.phoneID}>{phone.phone}</li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p>The user does not have any registered phone numbers</p>
                    )}                    
                </div>
                <div className={styles.cards_details}>
                    <h3>Address Information</h3>
                    { user && user.addresses ? (
                        <ul>
                            { user.addresses.map((address) =>{
                                return (
                                    <li key={address.addressID} >
                                        <div >
                                            <p>{address.address}, {address.city}, {address.state} {address.zip_code}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    ):(
                        <p>The user does not have any registered addresses</p>
                    )}
                </div>
            </div>
        </div>
    )
}