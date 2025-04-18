import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';

const EditRecord = ({ record, updateRecord }: { record: any; updateRecord: (updatedRecord: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    status: '',
    date: '',
  });

  // Pre-fill the form with the current record's data
  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name || '',
        position: record.position || '',
        status: record.status || '',
        date: record.date || '',
      });
    }
  }, [record]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation here if necessary
    updateRecord(formData); // Update the record with the new form data
  };

  return (
    <div>
      <h3>Edit Record</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Position"
              fullWidth
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              fullWidth
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditRecord;
