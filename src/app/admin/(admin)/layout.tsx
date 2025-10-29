import { PropsWithChildren } from "react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  
  return <div>Admin layout {children}</div>;
};

export default AdminLayout;


// KKB 3 months -> Arbeitserlaubnis
// KKB 8 months -> Visa

/**
 * Aplicant
 * 1. Form submission
 * 2. Application RECEIVED
 * 3. Admin changes the status to IN_PROGRESS
 * 4. DONE
 */

// RECEIVED -> IN_PROGRESS -> ACCEPTED or CANCELLED

/**
 * Requested features:
 * 1. Edit applications profiles
 * 2. Office notice (Giuli or other offices)
 * 3. Search bar for applications (name, instagram, email, phone)
 * 4. Delete applications
 */