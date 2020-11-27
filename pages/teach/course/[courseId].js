import Course from "@components/Course"

const ProtectedRouteCourse = ({course}) => {
    return (
        <Course course={course} />
        
    )
}

export default ProtectedRouteCourse



export const getServerSideProps = async (ctx) => {

    const id = ctx.params.courseId;
    let req = await fetch(`http://localhost:3000/api/courses/${id}`);
    const res = await req.text();
  
    if (res && !res.error) {
      return {
        props: {
          course: JSON.parse(res),
        },
      };
    }
    return {
      props: { error: res.error },
    };
  };
  