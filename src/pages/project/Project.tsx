import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectSingleProjectState } from '../../redux-store/singleProject.slice'
import { getProjectsDocument } from '../../utils/firebaseFunctions'
import ProjectSummary from './ProjectSummary'
import styles from './styles'
import ProjectComments from './ProjectComments'

const Project = () => {
  const { id } = useParams()
  const { singleProject } = useAppSelector(selectSingleProjectState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getProjectsDocument(id, dispatch, navigate)
  }, [id, dispatch, navigate])

  return (
    <Layout>
      <Grid container gap={3} sx={{ p: '1rem 2rem' }}>
        <Grid item xs={12} xl={6.5}>
          <ProjectSummary project={singleProject} />
        </Grid>
        <Grid item xs={12} xl={5}>
          <ProjectComments project={singleProject} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Project
