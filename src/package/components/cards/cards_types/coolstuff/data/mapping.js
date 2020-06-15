import uuid from 'uuid/v4';
import moment from 'moment';

export const mapProjectsFromJsonResume = (jsonResume) => ({
    projects: jsonResume?.coolstuff?.map((project, index) => ({
        ...project,
        // generating uuid for manipulating data if not present
        id: project.id || uuid(),
        date: project.endDate && moment(project.endDate, 'YYYY-MM-DD'),
        index: project.index || index
    }))
});

export const mapProjectToJsonResume = (project) => ({
    ...project,
    id: project.id || uuid(),
    endDate: project.date && project.date.format('YYYY-MM-DD')
});

export const updateProjectsArray = (newProject, jsonResume) => {
    if (!jsonResume.coolstuff?.length) {
        return { projects: [newProject] };
    }
    const newProjects = [...jsonResume.coolstuff];

    if (!Number.isNaN(Number(newProject.index))) {
        newProjects[newProject.index] = newProject;
        return { projects: newProjects };
    }
    return { projects: newProjects.concat(newProject) };
};
