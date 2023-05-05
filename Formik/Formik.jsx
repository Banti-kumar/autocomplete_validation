import React from 'react'
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import { TextField, Grid, Button } from "@material-ui/core"
import { Autocomplete } from '@material-ui/lab'
import * as Yup from 'yup'

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 }
];

const FormikComp = () => {

    let reset;

    const empty = {
        firstname: "",
        autocomp: []
    }

    const initialValues = {
        arrfield: [empty]
    }


    const validationSchema = Yup.object().shape({
        arrfield: Yup.array().of(
            Yup.object().shape({
                firstname: Yup.string().required("Enter First Name"),
                autocomp: Yup.array().required("ahvajhvasjd").min(1, "Please select  One Values")
                    .of(
                        Yup.object().shape({
                            title: Yup.string().required(),
                            year: Yup.number().required(),
                        })
                    ),
            })
        ),
    });

    return (
        <Grid container >
            <Grid item xs={4} >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                        reset()

                    }}
                >
                    {({ values, setFieldValue, handleChange, handleReset }) => (
                        < Form >
                            <FieldArray
                                name='arrfield'
                            >
                                {() => (
                                    <>
                                        {values.arrfield.map((item, index) => {
                                            return (
                                                <>
                                                    <Grid>
                                                        <TextField
                                                            fullWidth
                                                            id="outlined-basic"
                                                            label="First Name"
                                                            variant="outlined"
                                                            size='small'
                                                            autoComplete='off'
                                                            name={`arrfield.${index}.firstname`}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <ErrorMessage component='span' name={`arrfield.${index}.firstname`} />
                                                    <br />
                                                    <Grid>
                                                        <Autocomplete
                                                            fullWidth
                                                            size='small'
                                                            multiple
                                                            name={`arrfield.${index}.autocomp`}
                                                            id="tags-outlined"
                                                            options={top100Films}
                                                            onChange={(event, newValue) => {
                                                                setFieldValue(`arrfield.${index}.autocomp`, newValue)

                                                            }}
                                                            getOptionLabel={(option) => option.title}
                                                            filterSelectedOptions
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    variant="outlined"
                                                                    label="Select Department"
                                                                    placeholder="Departments"
                                                                />
                                                            )}
                                                        />
                                                        <ErrorMessage component='span' name={`arrfield.${index}.autocomp`} />
                                                    </Grid>
                                                </>
                                            )
                                        })}
                                    </>
                                )}
                            </FieldArray><br />
                            <Grid className='split_displya_button_p' >
                                <Button
                                    type='submit'
                                    className='split_displya_button'
                                    size='medium'
                                    variant="contained"
                                    color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid >
    )
}

export default FormikComp