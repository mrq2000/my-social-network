import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Grid, FormHelperText,
  TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { api, setToken } from '../../helpers/axios';
import { userRegisterSchema } from '../../validators/users';
import genderEnums from '../../enums/gender';
import useDistrict from '../../queries/useDistrict';
import useProvince from '../../queries/useProvince';
import { formatDatabaseDateTime } from '../../helpers/dayjs';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const SignUpDialog = ({ open, handleClose, providerAccessToken }) => {
  const {
    register,
    errors,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
    mode: 'onSubmit',
    defaultValues: {
      birthday: null,
    },
  });

  const { district } = watch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [provinceId, setProvinceId] = useState(null);
  const { data: provinces, isLoading: loadingProvinces } = useProvince();
  const { data: districts, isLoading: loadingDistrict } = useDistrict(provinceId);

  const { data, mutate: signUp, isLoading } = useMutation(async (userInfo) => {
    const res = await api.post('/sign-up', {
      providerAccessToken,
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      birthday: formatDatabaseDateTime(userInfo.birthday),
      province: userInfo.province.province_name,
      district: userInfo.district.district_name,
      location: userInfo.location || null,
    });
    return res.data;
  }, {
    onSuccess: () => {
      enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Có lỗi xảy ra :(. Vui lòng thử lại sau', { variant: 'error' });
    },
  });

  useEffect(() => {
    setValue('district', undefined);
  }, [provinceId, setValue]);

  if (data && data.accessToken) {
    setToken(data.accessToken);
    history.push('/');
  }

  return (
    <Dialog
      open={open}
      keepMounted
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Đăng ký tài khoản
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Họ và tên"
              name="fullName"
              fullWidth
              variant="outlined"
              inputRef={register}
              error={!!errors.fullName}
              helperText={errors.fullName ? errors.fullName.message : ''}
            />
          </Grid>

          <Grid item xs={8}>
            <Controller
              render={({ onChange, ...props }) => (
                <KeyboardDatePicker
                  {...props}
                  inputVariant="outlined"
                  label="Ngày sinh"
                  placeholder="dd-mm-yyyy"
                  autoOk
                  format="DD-MM-YYYY"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.birthday}
                  helperText={errors.birthday ? errors.birthday.message : ''}
                  onChange={(e) => onChange(e || '')}
                />
              )}
              name="birthday"
              control={control}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl variant="outlined" fullWidth error={!!errors.gender}>
              <InputLabel>Giới tính</InputLabel>
              <Controller
                as={(
                  <Select label="Giới tính">
                    {genderEnums.getValues().map((val) => (
                      <MenuItem value={val}>{genderEnums.getGender(val)}</MenuItem>
                    ))}
                  </Select>
                )}
                name="gender"
                defaultValue={genderEnums.MALE}
                control={control}
              />
              <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Controller
              render={({ onChange, ...props }) => (
                <Autocomplete
                  {...props}
                  options={
                    provinces && provinces.results ? provinces.results : []
                  }
                  getOptionLabel={(option) => (option.province_name)}
                  filterSelectedOptions
                  getOptionSelected={(option, value) => option.province_id === value.province_id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tỉnh"
                      name="provinces"
                      variant="outlined"
                      fullWidth
                      error={!!errors.province}
                      helperText={errors.province ? errors.province.message : ''}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingProvinces ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  onChange={(_, value) => {
                    setProvinceId(value && value.province_id ? value.province_id : null);
                    onChange(value || undefined);
                    setValue('district', undefined);
                  }}
                />
              )}
              name="province"
              control={control}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              render={({ onChange, ...props }) => (
                <Autocomplete
                  {...props}
                  options={
                    districts && districts.results ? districts.results : []
                  }
                  defaultValue={district}
                  getOptionLabel={(option) => (option.district_name)}
                  filterSelectedOptions
                  getOptionSelected={(opt, val) => opt.district_id === (val ? val.district_id : -1)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Huyện"
                      variant="outlined"
                      fullWidth
                      error={!!errors.district}
                      helperText={errors.district ? errors.district.message : ''}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingDistrict ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  onChange={(_, value) => {
                    onChange(value);
                  }}
                />
              )}
              name="district"
              defaultValue={null}
              control={control}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa điểm thường chú"
              name="location"
              variant="outlined"
              inputRef={register}
              error={!!errors.location}
              helperText={errors.location ? errors.location.message : ''}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmit(signUp)} color="primary" disabled={isLoading}>
          Đăng ký
        </Button>
        <Button onClick={handleClose} color="primary" disabled={isLoading}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SignUpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  providerAccessToken: PropTypes.string.isRequired,
};

export default SignUpDialog;
