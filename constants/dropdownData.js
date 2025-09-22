// Centralized dropdown data for the CRM application
// This file contains all dropdown options used across different screens

export const leadSources = [
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Meta", value: "meta" },
  { label: "Website", value: "website" },
  { label: "Referral", value: "referral" },
  { label: "Cold Call", value: "cold_call" },
  { label: "Email Campaign", value: "email_campaign" },
  { label: "Google Ads", value: "google_ads" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Direct", value: "direct" },
];

export const countries = [
  { label: "India", value: "india" },
  { label: "UAE", value: "uae" },
  { label: "Canada", value: "canada" },
  { label: "Australia", value: "australia" },
  { label: "USA", value: "usa" },
  { label: "UK", value: "uk" },
  { label: "Singapore", value: "singapore" },
  { label: "Germany", value: "germany" },
  { label: "France", value: "france" },
];

export const branches = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Pune", value: "pune" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Lucknow", value: "lucknow" },
];

export const leadStatuses = [
  { label: "New Lead", value: "new" },
  { label: "Qualified", value: "qualified" },
  { label: "Contacted", value: "contacted" },
  { label: "Proposal Sent", value: "proposal_sent" },
  { label: "Negotiation", value: "negotiation" },
  { label: "Converted", value: "converted" },
  { label: "Lost", value: "lost" },
  { label: "On Hold", value: "on_hold" },
];

export const leadSubStatuses = [
  { label: "Hot Lead", value: "hot" },
  { label: "Warm Lead", value: "warm" },
  { label: "Cold Lead", value: "cold" },
  { label: "Follow Up", value: "followup" },
  { label: "Not Interested", value: "not_interested" },
  { label: "Budget Issue", value: "budget_issue" },
  { label: "Wrong Contact", value: "wrong_contact" },
  { label: "Future Opportunity", value: "future_opportunity" },
];

export const formTypes = [
  { label: "Contact Form", value: "contact" },
  { label: "Newsletter", value: "newsletter" },
  { label: "Demo Request", value: "demo" },
  { label: "Quote Request", value: "quote" },
  { label: "Consultation", value: "consultation" },
  { label: "Support Request", value: "support" },
  { label: "Partnership", value: "partnership" },
];

export const userRoles = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Sales Rep", value: "sales_rep" },
  { label: "Lead Gen", value: "lead_gen" },
  { label: "Support", value: "support" },
  { label: "Marketing", value: "marketing" },
];

export const users = [
  { label: "John Doe", value: "john_doe" },
  { label: "Jane Smith", value: "jane_smith" },
  { label: "Mike Johnson", value: "mike_johnson" },
  { label: "Sarah Wilson", value: "sarah_wilson" },
  { label: "David Brown", value: "david_brown" },
  { label: "Emily Davis", value: "emily_davis" },
  { label: "Chris Miller", value: "chris_miller" },
  { label: "Lisa Anderson", value: "lisa_anderson" },
];

export const priorities = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export const districts = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Pune", value: "pune" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Lucknow", value: "lucknow" },
  { label: "Kanpur", value: "kanpur" },
  { label: "Nagpur", value: "nagpur" },
  { label: "Indore", value: "indore" },
  { label: "Thane", value: "thane" },
  { label: "Bhopal", value: "bhopal" },
  { label: "Visakhapatnam", value: "visakhapatnam" },
  { label: "Pimpri-Chinchwad", value: "pimpri_chinchwad" },
  { label: "Patna", value: "patna" },
  { label: "Vadodara", value: "vadodara" },
  { label: "Ghaziabad", value: "ghaziabad" },
  { label: "Other", value: "other" },
];

export const industries = [
  { label: "Technology", value: "technology" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Retail", value: "retail" },
  { label: "Real Estate", value: "real_estate" },
  { label: "Consulting", value: "consulting" },
  { label: "Other", value: "other" },
];

// Filter options for filter screens (includes "All" options)
export const filterOptions = {
  branch: [{ label: "All Branches", value: "all" }, ...branches],
  status: [{ label: "All Status", value: "all" }, ...leadStatuses],
  subStatus: [{ label: "All Sub Status", value: "all" }, ...leadSubStatuses],
  country: [{ label: "All Countries", value: "all" }, ...countries],
  form: [{ label: "All Forms", value: "all" }, ...formTypes],
  source: [{ label: "All Sources", value: "all" }, ...leadSources],
  role: [{ label: "All Roles", value: "all" }, ...userRoles],
  user: [{ label: "All Users", value: "all" }, ...users],
  priority: [{ label: "All Priorities", value: "all" }, ...priorities],
  industry: [{ label: "All Industries", value: "all" }, ...industries],
  district: [{ label: "All Districts", value: "all" }, ...districts],
};
