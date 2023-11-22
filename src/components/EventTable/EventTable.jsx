import { useMemo, useState } from 'react';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

//Material UI Imports
import { Box, Button, ListItemIcon, MenuItem, Stack, lighten } from '@mui/material';

//Icons Imports
import { Delete, Edit } from '@mui/icons-material';

const Example = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { events, deleteEvent } = useStore((store) => ({
    events: store.events,
    deleteEvent: store.deleteEvent,
    editEvent: store.editEvent,
  }));

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditClick = (id) => {
    setSelectedEvent(events.find((e) => e.id === id));
    setEditModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        id: 'events', //id used to define `group` column
        header: 'Events',
        columns: [
          {
            accessorKey: 'id',
            header: 'ID',
            size: 300,
          },
          {
            accessorKey: 'eventName',
            filterVariant: 'autocomplete',
            header: 'Event name',
            size: 300,
          },
          {
            accessorKey: 'description',
            filterVariant: 'autocomplete',
            header: 'Description',
            size: 300,
          },
          {
            accessorKey: 'imageUrl',
            filterVariant: 'autocomplete',
            header: 'Image',
            size: 300,
            Cell: ({ renderedCellValue, row }) => (
              <Stack
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="war image"
                  height={80}
                  src={row.original.imageUrl}
                  loading="lazy"
                  // style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Stack>
            ),
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: 'date1',
            header: 'Start Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
          {
            accessorFn: (row) => new Date(row.endDate), //convert to Date for sorting and filtering
            id: 'date2',
            header: 'End Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
          {
            accessorKey: 'categoryId',
            filterVariant: 'between',
            header: 'Category ID',
            size: 300,
          },
        ],
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: events, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    // enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          handleEditClick(row.original.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          deleteEvent(row.original.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {selectedEvent && (
        <EventEditModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          eventData={selectedEvent}
        />
      )}
    </>
  );
};

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useStore from '../../store';
import { EventEditModal } from '../EventEditModal';

export const EventTable = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);
