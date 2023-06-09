import React, { useState } from 'react';

const StudentDashboard = () => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    // Function to handle class selection
    const handleSelectClass = (classData) => {
        setSelectedClasses([...selectedClasses, classData]);
    };

    // Function to handle class deletion
    const handleDeleteClass = (classData) => {
        const updatedClasses = selectedClasses.filter(
            (c) => c.id !== classData.id
        );
        setSelectedClasses(updatedClasses);
    };

    // Function to handle class payment
    const handlePayClass = (classData) => {
        // Move class from selectedClasses to enrolledClasses
        setSelectedClasses(selectedClasses.filter((c) => c.id !== classData.id));
        setEnrolledClasses([...enrolledClasses, classData]);
    };

    return (
        <div>
            <h1>My Selected Classes</h1>
            {selectedClasses.map((classData) => (
                <div key={classData.id}>
                    <p>Class Name: {classData.name}</p>
                    <p>Date: {classData.date}</p>
                    <p>Time: {classData.time}</p>
                    <p>Location: {classData.location}</p>
                    <button onClick={() => handleDeleteClass(classData)}>
                        Delete
                    </button>
                    <button onClick={() => handlePayClass(classData)}>Pay</button>
                </div>
            ))}

            <h1>My Enrolled Classes</h1>
            {enrolledClasses.map((classData) => (
                <div key={classData.id}>
                    <p>Class Name: {classData.name}</p>
                    <p>Date: {classData.date}</p>
                    <p>Time: {classData.time}</p>
                    <p>Location: {classData.location}</p>
                </div>
            ))}
        </div>
    );
};

export default StudentDashboard;
