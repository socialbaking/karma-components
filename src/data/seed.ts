import {
    Partner,
    getPartnerStore
} from "./data";
import {v5} from "uuid";
import {ok} from "../is";

const firstSeedingDate = new Date(1683589864494).toISOString();
const createdAt = firstSeedingDate;
const updatedAt = new Date().toISOString()

// Stable uuid namespace
const namespace = "536165e4-aa2a-4d17-ad7e-751251497a11";

const approvedAt = createdAt;
const partners: Partner[] = [
    {
        partnerName: "Cannabis Clinic",
        clinic: true,
        pharmacy: true,
        delivery: true,
        website: "https://cannabisclinic.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "CannaPlus+",
        clinic: true,
        pharmacy: true,
        delivery: true,
        website: "https://cannaplus.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "The Pain Clinic",
        clinic: true,
        pharmacy: true,
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Green Doctors",
        clinic: true,
        pharmacy: true,
        delivery: true,
        website: "https://greendoctors.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Dr Gulbransen GP",
        clinic: true,
        website: "https://www.cannabiscare.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Koru Medical Clinic",
        clinic: true,
        website: "https://korumedical.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "RestoreMe",
        clinic: true,
        website: "https://www.restoremeclinic.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Wellworks Pharmacy Taranaki Street",
        pharmacy: true,
        delivery: true,
        website: "https://www.wellworks.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Nga Hua Pharmacy",
        pharmacy: true,
        delivery: true,
        website: "https://www.ngahuapharmacy.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Medleaf Therapeutics",
        website: "https://medleaf.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "NUBU Pharmaceuticals",
        website: "https://www.nubupharma.com/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "MedReleaf NZ",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "CDC Pharmaceuticals",
        website: "https://www.cdc.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Helius Therapeutics",
        website: "https://www.helius.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Cannasouth Bioscience",
        website: "https://www.cannasouth.co.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "RUA Bioscience",
        website: "https://www.ruabio.com/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    },
    {
        partnerName: "Emerge Health New Zealand",
        website: "https://emergeaotearoa.org.nz/",
        approvedAt,
        approved: true,
        countryCode: "NZ"
    }
]
    .map((data): Partner => ({
        ...data,
        partnerId: v5(data.partnerName, namespace),
        createdAt,
        updatedAt
    }));


function getPartner(name: string) {
    const found = partners.find(partner => partner.partnerName === name);
    ok(found, `Expected partner ${name}`);
    return found;
}

export async function seedPartners() {
    const partnerStore = getPartnerStore();


    async function putPartner(data: Partner) {
        const { partnerId } = data;
        const existing = await partnerStore.get(partnerId);
        if (existing && !isChange(data, existing)) {
            return;
        }
        const partner: Partner = {
            ...existing,
            ...data,
            updatedAt
        };
        await partnerStore.set(partnerId, partner);
    }

    await Promise.all(
        partners.map(putPartner)
    );

}


export async function seed() {
    await seedPartners();
}

const IGNORE_KEYS: string[] = ["updatedAt", "createdAt"];

function isChange(left: Record<string, unknown>, right: Record<string, unknown>) {
    return !Object.entries(left)
        .filter((pair) => !IGNORE_KEYS.includes(pair[0]))
        .every(([key, value]) => right[key] === value);
}
