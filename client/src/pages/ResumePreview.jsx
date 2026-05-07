import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const ResumePreview = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          alert("Please login first");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/resume/get-resume/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const apiData = response.data.data;
        if (apiData && apiData.resumeData) {
          setResumeData(apiData.resumeData);
        } else {
          setResumeData(apiData);
        }

        // Template selection logic
        let templateToUse = 1;
        if (location.state?.templateId) {
          templateToUse = location.state.templateId;
        } else if (apiData?.templateType) {
          templateToUse = apiData.templateType;
        } else {
          const savedTemplate = localStorage.getItem('selectedTemplate');
          if (savedTemplate) {
            templateToUse = parseInt(savedTemplate);
          }
        }

        setSelectedTemplate(templateToUse);

      } catch (error) {
        console.error("❌ Error:", error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) fetchResumeData();
  }, [resumeId, navigate, location]);

  const handlePrint = () => {
    window.print();
  };

  const changeTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    localStorage.setItem('selectedTemplate', templateId.toString());
  };

  // ========== TEMPLATE 1: EXACT FIRST IMAGE DESIGN ==========
  const renderTemplate1 = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl resume-container font-sans" style={{ padding: '20px' }}>
      {/* Header - EXACT like first image */}
      <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
          {resumeData.profile?.firstName && resumeData.profile?.lastName 
            ? `${resumeData.profile.firstName} ${resumeData.profile.lastName}`
            : "ABHIJIT KHYADE"
          }
        </h1>
      </div>

      {/* Education Section - EXACT like first image */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
          Education
        </h2>
        
        {resumeData.education?.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                  {edu.field || edu.degree || "Course"}
                </h3>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {edu.startYear && edu.endYear ? `${edu.startYear}-${edu.endYear}` : edu.year || "Year"}
                </span>
              </div>
              
              <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>
                {edu.college || edu.institution}
              </p>
              
              {edu.branch && (
                <p style={{ fontSize: '12px', margin: '2px 0', color: '#666' }}>
                  Branch: {edu.branch}
                </p>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '8px' }}>
                <span>Phone: +348</span>
                {(edu.grades || edu.percentage) && (
                  <span>
                    {edu.grades && `Grades: ${edu.grades}`}
                    {edu.percentage && `Percentage: ${edu.percentage}%`}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Pure Institute of Computer Technology</h3>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>TE IT Engineering</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
              <span>B 2021-2023</span>
              <span>Phone: +348</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left Column - Skills */}
        <div>
          {/* Skills Section */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Skills
            </h2>
            
            {/* Languages */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Languages:</h3>
              <div style={{ paddingLeft: '15px' }}>
                {resumeData.extraDetails?.skills?.languages?.map((skill, index) => (
                  <p key={index} style={{ fontSize: '12px', margin: '2px 0' }}>- {skill}</p>
                )) || (
                  <>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- C++</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- Python</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- Java</p>
                  </>
                )}
              </div>
            </div>

            {/* Web */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Web:</h3>
              <div style={{ paddingLeft: '15px' }}>
                {resumeData.extraDetails?.skills?.web?.map((skill, index) => (
                  <p key={index} style={{ fontSize: '12px', margin: '2px 0' }}>- {skill}</p>
                )) || (
                  <>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- HTML</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- CSS</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- JavaScript</p>
                  </>
                )}
              </div>
            </div>

            {/* Web Frameworks */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>WebFrameworks:</h3>
              <div style={{ paddingLeft: '15px' }}>
                {resumeData.extraDetails?.skills?.webFrameworks?.map((skill, index) => (
                  <p key={index} style={{ fontSize: '12px', margin: '2px 0' }}>- [{skill}]</p>
                )) || (
                  <>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [Django]</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [Reuters]</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [Express.js]</p>
                  </>
                )}
              </div>
            </div>

            {/* Databases */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Databases:</h3>
              <div style={{ paddingLeft: '15px' }}>
                {resumeData.extraDetails?.skills?.databases?.map((skill, index) => (
                  <p key={index} style={{ fontSize: '12px', margin: '2px 0' }}>- [{skill}]</p>
                )) || (
                  <>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [PostgreSQL]</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [MongoDB]</p>
                  </>
                )}
              </div>
            </div>

            {/* Other Skills */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Other:</h3>
              <div style={{ paddingLeft: '15px' }}>
                {resumeData.extraDetails?.skills?.other?.map((skill, index) => (
                  <p key={index} style={{ fontSize: '12px', margin: '2px 0' }}>- [{skill}]</p>
                )) || (
                  <>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [Teamwork]</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}>- [Leadership]</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Coding Profile */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Coding Profile
            </h2>
            <div style={{ paddingLeft: '15px' }}>
              {(resumeData.profile?.github || resumeData.profile?.leetcode) && (
                <>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>🔍 {resumeData.profile.github || resumeData.profile.leetcode}</p>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>🔍 {resumeData.profile.leetcode || resumeData.profile.github}</p>
                </>
              ) || (
                <>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>🔍 a_blpade</p>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>🔍 a_blpade</p>
                </>
              )}
            </div>
          </div>

          {/* Core Subjects */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Core Subjects
            </h2>
            <div style={{ paddingLeft: '15px' }}>
              {(resumeData.extraDetails?.coreSubjects || []).map((subject, index) => (
                <p key={index} style={{ fontSize: '12px', margin: '2px 0' }}>- {subject}</p>
              )) || (
                <>
                  <p style={{ fontSize: '12px', margin: '2px 0' }}>- Data Structures and Algorithms</p>
                  <p style={{ fontSize: '12px', margin: '2px 0' }}>- Object Created Programming</p>
                  <p style={{ fontSize: '12px', margin: '2px 0' }}>- Database Management System</p>
                  <p style={{ fontSize: '12px', margin: '2px 0' }}>- Operating System</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Experience, Projects, Achievements */}
        <div>
          {/* Experience */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Experience
            </h2>
            
            {resumeData.experience?.length > 0 ? (
              resumeData.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                    {exp.role || exp.position}
                  </h3>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', margin: '0 0 8px 0' }}>
                    {exp.institute || exp.company || exp.organization}
                  </p>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>
                    {exp.start_date && exp.end_date ? `${exp.start_date} – ${exp.end_date}` : exp.duration || "Duration"}
                  </p>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    {exp.desc || exp.description}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Software Engineer Intern</h3>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', margin: '0 0 8px 0' }}>MARC Free Solutions</p>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>Nov-2022 – Jun-2024</p>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    Developed and maintained web applications using HTML, CSS, JavaScript and Reactor. Assisted in debugging and troubleshooting issues reported by users on QV team. Collaborated with senior developers to implement new features and enhance existing solutions.
                  </p>
                </div>
                
                <div style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Marketing Assistant</h3>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', margin: '0 0 8px 0' }}>MYXZ Marketing Agency</p>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    Conducted market research and computing analysis to identify trends and opportunities. Assisted in creating marketing campaigns across various channels, including brand needs and errors. Contributed in the development of marketing materials such as brochures, types, and presentations.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Projects
            </h2>
            
            {resumeData.projects?.length > 0 ? (
              resumeData.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                    {project.title} {project.link && <span style={{ color: '#007bff' }}>@</span>}
                  </h3>
                  {project.techstack && (
                    <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '0 0 8px 0', color: '#666' }}>
                      {project.techstack}
                    </p>
                  )}
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    {project.description}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div style={{ marginBottom: '15px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Online Bookstore <span style={{ color: '#007bff' }}>@</span></h3>
                  <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '0 0 8px 0', color: '#666' }}>
                    Ronald Rowe, Monika Everest Jr., Marquicki, Steve API
                  </p>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    An online platform for buying and selling books. Users can move themselves to one range of genres, view book details, and press purchases securely. Training features such as their authentication, cart manipulation, cart tracing, and payment processing.
                  </p>
                </div>
                
                <div style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Task Management App <span style={{ color: '#007bff' }}>@</span></h3>
                  <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '0 0 8px 0', color: '#666' }}>
                    Angus, President Davey, Stoyrstock, Guain z o., Hackensite
                  </p>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    A web-based task management application for organizing personal project tasks. Users can create tasks, assign them to team members, set deadlines, and track progress. Supported leaders like task prioritization, categorization, and notification reminders.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Achievements */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Achievements
            </h2>
            <div style={{ paddingLeft: '15px' }}>
              {(resumeData.extraDetails?.achievements || []).map((achievement, index) => (
                <p key={index} style={{ fontSize: '12px', margin: '5px 0' }}>- {achievement}</p>
              )) || (
                <>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>- View first steps in a regional coding competition.</p>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>- Winner of regional linkedness.</p>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>- Specialist on Coolerhouse.</p>
                </>
              )}
            </div>
          </div>

          {/* Extra Curricular */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
              Extra Curricular
            </h2>
            <div style={{ paddingLeft: '15px' }}>
              {(resumeData.extraDetails?.extraCurricular || []).map((activity, index) => (
                <p key={index} style={{ fontSize: '12px', margin: '5px 0' }}>- {activity}</p>
              )) || (
                <>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>- Volunteered as a mentor for underprivileged high school students.</p>
                  <p style={{ fontSize: '12px', margin: '5px 0' }}>- President of the computer science club, organizing coding workshops.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ========== TEMPLATE 2: EXACT SECOND IMAGE DESIGN ==========
  const renderTemplate2 = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl resume-container font-sans" style={{ padding: '20px' }}>
      {/* Header - EXACT like second image */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
          {resumeData.profile?.firstName && resumeData.profile?.lastName 
            ? `${resumeData.profile.firstName} ${resumeData.profile.lastName}`
            : "ABHIJIT KHYADE"
          }
        </h1>
      </div>

      {/* Experience First - EXACT like second image */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase' }}>
          Experience
        </h2>
        
        {resumeData.experience?.length > 0 ? (
          resumeData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                {exp.role || exp.position}
              </h3>
              <p style={{ fontSize: '14px', margin: '0 0 8px 0', paddingLeft: '10px' }}>
                - {exp.institute || exp.company || exp.organization}
              </p>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0', paddingLeft: '10px' }}>
                {exp.desc || exp.description}
              </p>
            </div>
          ))
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Software Engineer Intern</h3>
              <p style={{ fontSize: '14px', margin: '0 0 8px 0', paddingLeft: '10px' }}>
                - 2 ABC Flash Solutions
              </p>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0', paddingLeft: '10px' }}>
                Developers are designed and applications using HTML, CSS, JavaScript, and Rescuja. Assisted in developing and troubleshooting issues intended by users and Du team. Collaborated with server developers to implement new features and enhance existing solutions.
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Marketing Assistant</h3>
              <p style={{ fontSize: '14px', margin: '0 0 8px 0', paddingLeft: '10px' }}>
                - A1/22 Marketing Agency
              </p>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0', paddingLeft: '10px' }}>
                Database master research and competitor analysis to identify trends and opportunities. Assisted in creating marketing campaigns across various channels, including social media and forums. Contributed to the development of marketing materials such as brochures, flyers, and presentations.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Projects - EXACT like second image */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase' }}>
          Projects
        </h2>
        
        {resumeData.projects?.length > 0 ? (
          resumeData.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                {project.title} {project.link && <span style={{ color: '#007bff' }}>@</span>}
              </h3>
              {project.techstack && (
                <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '0 0 8px 0', color: '#666' }}>
                  {project.techstack}
                </p>
              )}
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                {project.description}
              </p>
            </div>
          ))
        ) : (
          <>
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Online Bookstore <span style={{ color: '#007bff' }}>@ Resi7a, Resiz, Mesa, Express, Hospice, SageAR</span></h3>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                Our online platform for buying and selling books. We have a unique library for sales and all games, view book details, and make purchases securely. Detailed features such as user authorizations, cart management, order tracking, and payment processing.
              </p>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Task Management App <span style={{ color: '#007bff' }}>@ Apple: Yonderful Query, Prospect, Chain 2c, WebAccess</span></h3>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                A web-based task management application for organizing personal or items tasks. Users can create a task, ensure them is learn from themes, and facilitate our data progress. Supports features like task prioritization, categorization, and notification reminders.
              </p>
            </div>
          </>
        )}
      </div>

      <hr style={{ margin: '25px 0', border: '1px solid #000' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left Column */}
        <div>
          {/* Education */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase' }}>
              Education
            </h2>
            
            {resumeData.education?.length > 0 ? (
              resumeData.education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                    {edu.field || edu.degree || "Course"}
                  </h3>
                  <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>{edu.college || edu.institution}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                    <span>
                      {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : edu.year || "Year"}
                    </span>
                    {(edu.grades || edu.percentage) && (
                      <span>
                        {edu.grades && `Grades: ${edu.grades}`}
                        {edu.percentage && `Per: ${edu.percentage}%`}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div style={{ marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Pune Institute of Computer Technology</h3>
                  <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Echo in IT</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Sanguanethwar College</h3>
                  <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Mainstream State Board</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Matsatana Phub Vidyalaya</h3>
                  <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Mainstream State Board</p>
                </div>
              </>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase' }}>
              Skills
            </h2>
            <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
              {resumeData.extraDetails?.skills ? (
                Object.entries(resumeData.extraDetails.skills).map(([category, skills]) => (
                  <p key={category} style={{ margin: '2px 0' }}>
                    <strong>{category}:</strong> {skills.join(", ")}
                  </p>
                ))
              ) : (
                <>
                  <p style={{ margin: '2px 0' }}><strong>Languages:</strong> C. Ch., Pyhan, Java,</p>
                  <p style={{ margin: '2px 0' }}><strong>Web:</strong> HTML, CSS, JavaScript,</p>
                  <p style={{ margin: '2px 0' }}><strong>WebTransformer:</strong> Sipray, Rescuja, ExpressP,</p>
                  <p style={{ margin: '2px 0' }}><strong>Databases:</strong> Prospectu, HospiceB,</p>
                  <p style={{ margin: '2px 0' }}><strong>Other:</strong> Teamwork, Leadership.</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Achievements and Extra Curricular */}
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase' }}>
              Achievements and ExtraCurricular
            </h2>
            <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
              {(resumeData.extraDetails?.achievements || []).map((achievement, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {achievement}</p>
              ))}
              
              {(resumeData.extraDetails?.extraCurricular || []).map((activity, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {activity}</p>
              )) || (
                <>
                  <p style={{ margin: '5px 0' }}>• "When first glance in a regional coding competition."</p>
                  <p style={{ margin: '5px 0' }}>• Volume of regional education.</p>
                  <p style={{ margin: '5px 0' }}>• Specialist on Cookeboost for underprivileged high school students.</p>
                  <p style={{ margin: '5px 0' }}>• Workshop on a member of the organization.</p>
                  <p style={{ margin: '5px 0' }}>• President of the computer science club, organising coding workshops.</p>
                </>
              )}
            </div>
          </div>

          {/* Year Information */}
          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>2021 - 2023</span>
              <span>COSA: 243</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px' }}>
              <span>2024 - 2025</span>
              <span>Per: 96, 95</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px' }}>
              <span>2018 - 2019</span>
              <span>Per: 96, 95%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ========== MAIN RENDER FUNCTION ==========
  const renderResume = () => {
    if (!resumeData) return null;

    console.log("🖨️ Rendering Template:", selectedTemplate);

    switch (selectedTemplate) {
      case 1:
        return renderTemplate1();
      case 2:
        return renderTemplate2();
      default:
        return renderTemplate1();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your professional resume...</p>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Resume Not Found</h2>
          <button 
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            .resume-container {
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .bg-gray-50 {
              background: white !important;
            }
          }
        `}
      </style>

      <div className="min-h-screen bg-gray-50 py-8 print:py-0">
        {/* Template Switcher */}
        <div className="max-w-4xl mx-auto mb-6 no-print">
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Current Template:</span>
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selectedTemplate === 1 ? "Template 1" : "Template 2"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => changeTemplate(1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTemplate === 1 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Template 1
              </button>
              <button
                onClick={() => changeTemplate(2)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTemplate === 2 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Template 2
              </button>
            </div>
          </div>
        </div>

        {/* Render Selected Template */}
        {renderResume()}

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-6 flex justify-between no-print">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            🖨️ Print Resume
          </button>
        </div>
      </div>
    </>
  );
};

export default ResumePreview; 