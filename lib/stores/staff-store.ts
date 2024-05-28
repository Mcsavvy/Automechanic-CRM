import Staff from "../@types/staff";
import Group from "../@types/group";
import { createStore } from "zustand/vanilla";
import axios from "axios";
import lodash from "lodash";

interface StaffCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  permissions?: string[];
  password?: string;
}

interface PaginatedStaffs {
  staff: Staff[];
  page: number;
  limit: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}

export type StaffFilter = {
  group?: string;
  status?: "active" | "banned";
  query?: string;
};

export type StaffState = {
  staff: Staff[];
  page: number;
  limit: number;
  filter: StaffFilter;
  pageCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  staffId: string;
  loaded: boolean;
  totalPages: number;
  groups: Group[];
};
interface ChangeGroup {
  groupId: string;
  state: boolean;
  staffId: string;
}
export interface StaffActions {
  setStaffs: (staff: Staff[]) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  deleteStaff: (staffId: string) => void;
  createStaff: (good: StaffCreate) => void;
  updateStaff: (staffId: string, good: Partial<StaffCreate>) => void;
  getStaff: (staffId: string) => Promise<Staff>;
  setFilter: (filter: StaffFilter) => void;
  applyFilter: (filter: StaffFilter) => void;
  clearFilter: () => void;
  getGroups: () => void;
  updateStaffGroup: (data: ChangeGroup) => void;
}

export type StaffStore = StaffState & StaffActions;

export const defaultStaffState: StaffState = {
  staff: [],
  page: 0,
  limit: 5,
  filter: {},
  totalPages: 0,
  pageCount: 0,
  hasNextPage: false,
  hasPrevPage: false,
  staffId: "",
  loaded: false,
  groups: [],
};

export const createStaff = async (staff: StaffCreate): Promise<Staff> => {
  try {
    const response = await axios.post("/api/users", staff);
    if (response.status !== 201) {
      throw response;
    }
    const newStaff = response.data;
    return {
      id: newStaff.id as string,
      firstName: newStaff.firstName as string,
      lastName: newStaff.lastName as string,
      phone: newStaff.phone as string,
      permissions: newStaff.permissions as any,
      email: newStaff.email as string,
      status: newStaff.status,
    };
  } catch (error) {
    throw error;
  }
};

export const updateStaff = async (
  staffId: string,
  staff: Partial<StaffCreate>
): Promise<Staff> => {
  try {
    const response = await axios.put(`/api/users/${staffId}`, staff);
    if (response.status !== 200) {
      throw response;
    }
    const newStaff = response.data;
    return {
      id: newStaff.id as string,
      firstName: newStaff.firstName as string,
      lastName: newStaff.lastName as string,
      phone: newStaff.phone as string,
      permissions: newStaff.permissions as any,
      email: newStaff.email as string,
      status: newStaff.status,
    };
  } catch (error) {
    throw error;
  }
};

export const getStaff = async (staffId: string): Promise<Staff> => {
  try {
    const response = await axios.get(`/api/users/${staffId}`);
    if (response.status !== 200) {
      throw response;
    }
    const newStaff = response.data;
    return {
      id: newStaff.id as string,
      firstName: newStaff.firstName as string,
      lastName: newStaff.lastName as string,
      phone: newStaff.phone as string,
      permissions: newStaff.permissions as any,
      email: newStaff.email as string,
      status: newStaff.status,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteStaff = async (staffId: string): Promise<void> => {
  try {
    const response = await axios.delete(`/api/users/${staffId}`);
    if (response.status !== 204) {
      throw response;
    }
  } catch (error) {
    throw error;
  }
};

export const getStaffs = async (
  page: number,
  limit: number,
  filter?: StaffFilter
): Promise<PaginatedStaffs> => {
  console.log("getStaffs", page, limit, filter);
  const queryParams = new URLSearchParams();
  queryParams.append("l", limit.toString());
  queryParams.append("p", page.toString());
  if (filter) {
    filter.group && queryParams.append("g", filter.group);
    filter.status && queryParams.append("s", filter.status);
    filter.query && queryParams.append("q", filter.query);
  }
  try {
    const response = await axios.get(`/api/staffs?${queryParams.toString()}`);
    if (response.status !== 200) {
      throw response;
    }
    console.log(response.data);
    const staffs: any[] = response.data.users;
    console.log(staffs);
    return {
      staff: staffs.map((staff: any) => ({
        id: staff._id.toString() as string,
        firstName: staff.firstName as string,
        lastName: staff.lastName as string,
        phone: staff.phone as string,
        permissions: staff.permissions as any,
        email: staff.email as string,
        status: staff.status,
      })),
      page,
      limit,
      pageCount: response.data.totalPages,
      hasNextPage: response.data.hasNextPage,
      hasPrevPage: response.data.hasPrevPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    throw error;
  }
};

export const getGroups = async (): Promise<any> => {
  try {
    const response = await axios.get("/api/groups");
    if (response.status !== 200) {
      throw response;
    }
    return response.data as any;
  } catch (error) {
    throw error;
  }
};

export const updateStaffGroup = async (data: ChangeGroup): Promise<any> => {
  const { state, groupId, staffId } = data;
  if (state) {
    try {
      const response = await axios.post(`/api/groups/${groupId}/add-member`, {
        staffId,
      });
      if (response.status !== 200) {
        throw response;
      }
      return { state, groupId, staffId };
    } catch (err) {
      throw err;
    }
  } else {
    try {
      const response = await axios.post(
        `/api/groups/${groupId}/remove-member`,
        { staffId }
      );
      if (response.status !== 200) {
        throw response;
      }
      return { state, groupId, staffId };
    } catch (err) {
      throw err;
    }
  }
};
export const createStaffStore = (state: StaffState) => {
  return createStore<StaffStore>((set) => {
    return {
      ...state,
      setStaffs: (staff: Staff[]) => set({ staff }),
      setPage: (page: number) =>
        set((state) => {
          if (page === state.page) {
            return {};
          }
          getStaffs(page, state.limit, state.filter).then((result) => {
            set(result);
          });
          return {};
        }),
      setLimit: (limit: number) =>
        set((state) => {
          if (limit === state.limit) {
            return {};
          }
          const page = 1; // reset the page to 1 when changing the limit
          getStaffs(page, limit).then((result) => {
            set(result);
          });
          return {};
        }),
      deleteStaff: async (staffId: string) =>
        set((state) => {
          deleteStaff(staffId).then(() => {
            // check if the good is in the current page
            if (state.staff.find((good) => good.id === staffId)) {
              // TODO: refetch the staff to maintain correct pagination
              const newStaffs = state.staff.filter(
                (good) => good.id !== staffId
              );
              set({ staff: newStaffs });
            }
          });
          return {};
        }),
      createStaff: async (good: StaffCreate) => {
        const newStaff = await createStaff(good);
        // TODO: refetch the staff to maintain correct pagination
        set((state) => ({ staff: [...state.staff, newStaff] }));
      },
      updateStaff: async (staffId: string, good: Partial<StaffCreate>) =>
        set((state) => {
          updateStaff(staffId, good).then((updatedStaff) => {
            const newStaffs = state.staff.map((g) =>
              g.id === staffId ? updatedStaff : g
            );
            set({ staff: newStaffs });
          });
          return {};
        }),
      getStaff: async (staffId: string) => {
        let good = state.staff.find((good) => good.id === staffId);
        if (!good) {
          good = await getStaff(staffId);
        }
        return good;
      },
      setFilter: (filter: StaffFilter) => set({ filter }),
      applyFilter: (filter: StaffFilter) =>
        set((state) => {
          const page = 1; // reset the page to 1 when applying a filter
          if (lodash.isEqual(filter, state.filter)) {
            return {};
          }
          getStaffs(page, state.limit, filter).then((result) => {
            set({ ...result, filter });
          });
          return {};
        }),
      clearFilter: () =>
        set((state) => {
          if (lodash.isEmpty(state.filter)) {
            return {};
          }
          getStaffs(state.page, state.limit).then((result) => {
            set({ ...result, filter: {} });
          });
          return {};
        }),
      getGroups: async () =>
        set((state) => {
          getGroups().then((groups) => {
            console.log(groups);
            set({ groups });
          });
          return {};
        }),
      updateStaffGroup: async (data: ChangeGroup) =>{
          updateStaffGroup(data)
      }
    };
  });
};
