import React, { useState } from 'react';



const PopularInstructor = () => {

    const [instructor,setInstructor]=useState()
    return (
        <div>
            <section className="popular-instructors-section">
                <h2>Popular Instructors</h2>
                <div className="instructor-grid">
                    {/* Display top 6 instructors based on number of students */}
                    {popularInstructors.slice(0, 6).map((instructor) => (
                        <div key={instructor.id} className="instructor-card">
                            <img src={instructor.image} alt={instructor.name} />
                            <h3>{instructor.name}</h3>
                            <p>{`${instructor.students} students`}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
